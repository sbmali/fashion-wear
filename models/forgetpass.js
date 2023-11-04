const mongoose = require('mongoose');
const ForgotPassSchema = new mongoose.Schema({
    userid: { type: String },
    email: { type: String, required: true },
    token: { type: String, required: true },
}, { timestamps: true });

mongoose.models = {}
export default mongoose.model("ForgotPass", ForgotPassSchema);