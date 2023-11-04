import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let user;
        user = await User.findOne({ email: req.body.email })
        if (!user) {
            const { name,email } = req.body
            let u = new User({name, email, password : CryptoJS.AES.encrypt(req.body.password,process.env.AES_SECRET).toString()})
            await u.save()
            var token = jwt.sign({email , name }, process.env.JWT_SECRET);
            res.status(200).json({ success: true, token, email })
            return
        }
        else{
            res.status(200).json({ success: false, error: 'User with this Email ID already exist. Please Login!!' })
            return
        }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
        return
    }
}
export default connectDb(handler);