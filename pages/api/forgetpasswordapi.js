import connectDb from "../../middleware/mongoose"
import ForgetPass from "../../models/forgetpass"
import User from "../../models/User"
let jwt = require('jsonwebtoken');
let cryptoJs = require("crypto-js");

const handler = async (req, res) => {
    if (req.body.sendMail) {
        // Check if the user exists in the Database
        let user = await User.findOne({ "email": req.body.email })
        if (user) {
            let token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
            let forgetpass = new ForgetPass({ email: req.body.email, token })
            await forgetpass.save()
            res.status(200).json({ sucess: true , token })
            return
        }
        else {
            res.status(200).json({ sucess: false, error: 'User not found' })
            return
        }
    }
    else {
        let dbtoken = await ForgetPass.findOne({ token: req.body.token })
        if (dbtoken) {
            await User.findOneAndUpdate({ email: dbtoken.email }, { password: cryptoJs.AES.encrypt(req.body.password, process.env.AES_SECRET).toString() })
            res.status(200).json({ sucess: true })
            return
        }
        res.status(200).json({ sucess: false, error: 'Invalid Token' })
        return
    }
}
export default connectDb(handler);