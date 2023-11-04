const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    oid: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    products: { type: Object },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    pincode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: 'Initiated' },
}, { timestamps: true });

mongoose.models = {}
export default mongoose.model("Order", OrderSchema);