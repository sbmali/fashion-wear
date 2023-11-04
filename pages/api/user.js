import User from "../../models/User"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let userById, searchById, search;
        try {
            userById = await User.findOne({ _id: req.body.id })
            searchById = await User.find({ _id: req.body.id })
        } catch (error) {
            search = await User.find({
                $or: [
                    {
                        name: req.body.search
                    },
                    {
                        email: req.body.search
                    },
                    {
                        phone: req.body.search
                    },
                    {
                        pincode: req.body.search
                    },
                    {
                        city: req.body.search
                    },
                    {
                        state: req.body.search
                    }
                ],
            })     
        }
        
        if (search) {
            res.status(200).json({ sucess: true, user: search})
            return
        }

        if (req.body.deletebyemail) {
            let p = await User.deleteOne({ email: req.body.email })
            res.status(200).json({ sucess: true })
            return
        }

        if (userById) {
            if (req.body.searchbyid) {
                res.status(200).json({ sucess: true, user: searchById })
                return
            }
            if (req.body.getuser) {
                res.status(200).json({ sucess: true, user: userById })
                return
            }
            if (req.body.updatebyid) {
                let p = await User.findByIdAndUpdate({ _id: req.body.id }, {
                    name: req.body.name,
                    email: req.body.email,
                    address: req.body.address,
                    city: req.body.city,
                    phone: req.body.phone,
                    pincode: req.body.pincode,
                    state: req.body.state
                })
                await p.save()
                res.status(200).json({ sucess: true })
                return
            }
            if (req.body.deletebyid) {
                let p = await User.deleteOne({ _id: req.body.id })
                res.status(200).json({ sucess: true })
                return
            }
        }
        else {
            res.status(200).json({ sucess: false, error: 'User not found!' })
            return
        }

    }
    else {
        res.status(200).json({ sucess: true, error: "This method is not allowed" })
        return
    }
}


export default connectDb(handler);