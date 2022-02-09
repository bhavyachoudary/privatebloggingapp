const mongoose = require('mongoose');
// blog schema
const blogSchema = new mongoose.Schema({
   email: {
      type: String,
      required: true

   },
   title: { type: String, required: true },
   des: { type: String, required: true },
   tags: { type: String, required: true, unique: true },
   myImage: { type: String },
   date: { type: Date, default: Date.now }

})
blogSchema.index({ title: 'text' });
module.exports = mongoose.model("blog", blogSchema);