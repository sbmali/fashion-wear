import Admin from "../../models/admin"
import connectDb from "../../middleware/mongoose"
let CryptoJS = require("crypto-js");
let jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let admin;
        admin = await Admin.findOne({ email: req.body.email })
        if (!admin) {
            const { name, email } = req.body
            let u = new Admin({ name, email, password: CryptoJS.AES.encrypt(req.body.npassword, process.env.AES_SECRET).toString() })
            await u.save()
            res.status(200).json({ sucess: true })
            return
        }
        else{
            res.status(200).json({ sucess: false, error: 'Admin with this Email ID already exist. Please Login!!' })
            return
        }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
        return
    }
}
export default connectDb(handler);