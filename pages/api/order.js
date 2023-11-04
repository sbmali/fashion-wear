import Order from "../../models/Order"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        if (req.body.searchbyid) {
            let orderById, searchById, search;
            try {
                orderById = await Order.findOne({ _id: req.body.id })
                searchById = await Order.find({ _id: req.body.id })
            } catch (error) {
                search = await Order.find({
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
                        },
                        {
                            status: req.body.search
                        }
                    ],
                })
            }

            if (search) {
                res.status(200).json({ sucess: true, order: search })
                return
            }

            if (orderById) {
                if (req.body.searchbyid) {
                    res.status(200).json({ sucess: true, order: searchById })
                    return
                }
                if (req.body.getorder) {
                    res.status(200).json({ sucess: true, order: orderById })
                    return
                }
            }
            else {
                res.status(200).json({ sucess: false, error: 'Order not found' })
                return
            }
        }
        const { email, products, address, amount, status } = req.body
        let u = await new Order({ email, products, address, amount, status })
        await u.save()
        res.status(200).json({ success: true })
        return
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
        return
    }
}
export default connectDb(handler);