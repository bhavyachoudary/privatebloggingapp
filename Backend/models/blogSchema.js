const mongoose=require('mongoose');

const blogSchema=new mongoose.Schema({
   email: {
      type: String,
      required: true

  },
   title:{type:String,required:true},
   des:{type:String,required:true},
   blogProfile:{ type: String },
   date: { type: Date, default: Date.now }
   
})

module.exports=mongoose.model("blog",blogSchema);