import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let productById, searchById, search;
        try {
            productById = await Product.findOne({ _id: req.body.id })
            searchById = await Product.find({ _id: req.body.id })
        } catch (error) {
            search = await Product.find({
                $or: [
                    {
                        title: req.body.search
                    },
                    {
                        slug: req.body.search
                    },
                    {
                        img: req.body.search
                    },
                    {
                        category: req.body.search
                    },
                    {
                        size: req.body.search
                    },
                    {
                        color: req.body.search
                    }
                ],
            })
        }

        if (search) {
            res.status(200).json({ sucess: true, product: search})
            return
        }

        if(req.body.fetchProduct){
            let products = await Product.find().skip(req.body.page).limit(req.body.pageSize)
            res.status(200).json({body:products})
            return
        }

        if (productById) {
            if (req.body.searchbyid) {
                res.status(200).json({ sucess: true, product: searchById })
                return
            }
            if (req.body.getproduct) {
                res.status(200).json({ sucess: true, product: productById })
                return
            }
            if (req.body.updatebyid) {
                let p = await Product.findByIdAndUpdate({ _id: req.body.id }, {
                    title: req.body.title,
                    slug: req.body.slug,
                    desc: req.body.description,
                    img: req.body.imgurl,
                    category: req.body.category,
                    size: req.body.size,
                    color: req.body.color,
                    price: req.body.price,
                    availableQty: req.body.availableQty
                })
                await p.save()
                res.status(200).json({ sucess: true })
                return
            }
            if (req.body.deletebyid) {
                let p = await Product.deleteOne({ _id: req.body.id })
                res.status(200).json({ sucess: true })
                return
            }
        }
        else{
            res.status(200).json({ sucess: false, error: 'Product not found!' })
            return
        }
    }
    else {
        res.status(200).json({ sucess: true, error: "This method is not allowed" })
        return
    }
}
export default connectDb(handler);