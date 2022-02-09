const mongoose = require('mongoose')
// user schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imagePath: { type: String, required: true }

})

module.exports = mongoose.model('Users', userSchema)