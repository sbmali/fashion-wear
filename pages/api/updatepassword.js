import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
import jsonwebtoken from "jsonwebtoken"
let cryptoJs = require("crypto-js");

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let token = req.body.token
        let user = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        let dbuser = await User.findOne({email: user.email})
        const bytes  = cryptoJs.AES.decrypt(dbuser.password, process.env.AES_SECRET);
        let decryptedPassword = bytes.toString(cryptoJs.enc.Utf8);
        if(decryptedPassword == req.body.password && req.body.npassword == req.body.cpassword){
            await User.findOneAndUpdate({ email: dbuser.email }, {password : cryptoJs.AES.encrypt(req.body.npassword,process.env.AES_SECRET).toString()})
            res.status(200).json({ sucess:true })
            return
        }
        res.status(200).json({ sucess:false })
        return
    }
    else {
        res.status(400).json({ error: "error" })
        return
    }
}
export default connectDb(handler);