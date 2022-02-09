const mongoose = require('mongoose');
// otp schema
const otpSchema = new mongoose.Schema({
    code: {
        type: String
    },
    email: {
        type: String
    },
    expiresIn: {
        type: Number
    },
})
module.exports = mongoose.model("Otp", otpSchema)