// addproducts.js
import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let duplicate = await Product.findOne({ "slug": req.body.slug })
        if (duplicate) {
            res.status(200).json({ sucess: false, error: 'Duplicate Slug. Please try again!' })
            return
        }
        else {
            let p = new Product({
                title: req.body.title,
                slug: req.body.slug,
                desc: req.body.description,
                img: req.body.imgurl,
                category: req.body.category,
                size: req.body.size,
                color: req.body.color,
                price: req.body.price,
                availableQty: req.body.availableQty,
            })
            await p.save()
            res.status(200).json({ sucess: true })
            return
        }
    }
    else {
        res.status(200).json({ sucess: false, error: "This method is not allowed" })
        return
    }
}
export default connectDb(handler);