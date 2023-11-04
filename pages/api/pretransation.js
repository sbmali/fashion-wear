import connectDb from "../../middleware/mongoose"
import Product from "../../models/Product"
import Order from "../../models/Order"
import mongoose from "mongoose";

const handler = async (req, res) => {
    if (req.method == 'POST') {

        // Check if the cart is tampered with Aa ab
        let product, sumTotal = 0;
        let cart = req.body.cart;
        for (let item in cart) {
            sumTotal += cart[item].price * cart[item].qty
            product = await Product.findOne({ slug: item })
            if (product.price != cart[item].price) {
                res.status(200).json({ success: false, "error": "The price of some items in your cart have changed. Please try again" })
                return
            }
        }
        if (sumTotal !== req.body.subtotal) {
            res.status(200).json({ success: false, "error": "The price of some items in your cart have changed. Please try again" })
            return
        }

        // Initiate an order
        let oid = Math.floor(Math.random() * Date.now());
        let order = new Order({
            oid: oid,
            name: req.body.name,
            email: req.body.email,
            products: req.body.cart,
            address: req.body.address,
            phone: req.body.phone,
            pincode: req.body.pincode,
            city: req.body.city,
            state: req.body.state,
            amount: req.body.subtotal,
        })
        await order.save()

        res.status(200).json({ sucess: true ,oid})
    }
}
export default connectDb(handler);