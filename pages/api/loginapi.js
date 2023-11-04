import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let user = await User.findOne({ "email": req.body.email })
        if (user) {
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
            let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
            if (user) {
                if (req.body.email == user.email && req.body.password == decryptedPassword) {
                    var token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET);
                    res.status(200).json({ success: true, token, email: req.body.email })
                    return
                }
                else {
                    res.status(200).json({ success: false, error: 'Invalid Credentials' })
                    return
                }
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