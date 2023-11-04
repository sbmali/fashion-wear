import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
let CryptoJS = require("crypto-js");
let jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let user;
        user = await User.findOne({ email: req.body.email })
        if (!user) {
            const { name, email, address, city, phone, pincode, state } = req.body
            let u = new User({ name, email, address, city, phone, pincode, state, password: CryptoJS.AES.encrypt(req.body.npassword, process.env.AES_SECRET).toString() })
            await u.save()
            let token = jwt.sign({ email, name }, process.env.JWT_SECRET);
            res.status(200).json({ sucess: true, token, email })
            return
        }
        else{
            res.status(200).json({ sucess: false, error: 'User with this Email ID already exist. Please Login!!' })
            return
        }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
        return
    }
}
export default connectDb(handler);