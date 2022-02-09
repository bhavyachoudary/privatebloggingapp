const mongoose = require('mongoose')
// Connection with database
const db = "mongodb://localhost:27017/privateblog";
async function connectDB() {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log("Mongoose connected")
    }
    catch (err) {
        console.log(err.message)
    }
}
module.exports = connectDB;