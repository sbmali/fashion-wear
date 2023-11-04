import Admin from "../../models/admin"
import connectDb from "../../middleware/mongoose"
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let admin = await Admin.findOne({ "email": req.body.email })
        if (admin) {
            const bytes = CryptoJS.AES.decrypt(admin.password, process.env.AES_SECRET);
            let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
            if (req.body.email == admin.email && req.body.password == decryptedPassword) {
                let token = jwt.sign({ email: admin.email, name: admin.name }, process.env.JWT_SECRET);
                res.status(200).json({ success: true, token, email: req.body.email })
                return
            }
            else {
                res.status(200).json({ success: false, error: 'Invalid Credentials' })
                return
            }
        }
        else{
            res.status(200).json({ success: false, error: 'no user found' })
            return
        }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
        return
    }
}
export default connectDb(handler);