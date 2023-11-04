import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
import jsonwebtoken from "jsonwebtoken"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        if(req.body.userExist){
            let existuser = await User.findOne({ email: req.body.email })
            if(existuser){
                res.status(200).json({ sucess: true })
                return
            }
            else{
                res.status(200).json({ sucess: false })
                return
            }
        }
        let token = req.body.token
        let user = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        let dbuser = await User.findOne({ email: user.email })
        const {name,email,password,address,phone,pincode,city,state} = dbuser
        res.status(200).json({ name,email,password,address,phone,pincode,city,state })
        return
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
        return
    }
}
export default connectDb(handler);