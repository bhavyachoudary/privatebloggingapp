
const blogModel = require('../models/blogSchema')

const blogCtrl = {
    addblog:  (req, res) => {
        console.log(req.body)
        let title=req.body.title;
        let des=req.body.des;
        let email= req.body.email

    let ins=  new blogModel({title:title,des:des,email:email});
        console.log(ins)
     ins.save((err)=>{
            if(err){
                res.json({ "err": "Please fill the form" })
            }
            else{
                res.json({ "msg": "Blog added successfully"})
               
            }
            
        })
},
getAllBlogsdata: (req, res) =>{
    blogModel.find({},(err, data)=> {
        if(err){
            res.status(200).json({status:401,err:'Somthing went wrong'})
        }
        else{
            res.status(200).json({status:200, blogdata:data})  
        }
    })
  
},


getBlogdata: (req, res) => {
    let email = req.params.email;
    console.log(email)
    blogModel.find({ email: email }, (err, data) => {
        if (err) {
            res.status(200).json({status:401, err: err })
        }
        else{
        res.status(200).json({status:200, blogdata: data})
        }
    })
},

    multer: (req, res) => {
        console.log(req.file)
        if (req.file) {
            console.log(req.file)
            console.log(req.body)
            let imgpath = req.file.filename;

            blogModel.updateOne({ email: req.body.email }, { $set: { blogProfile: imgpath } }, (err) => {
                if (err) {
                    res.status(200).json({status:401, err: "error msg" })
                }
                else {
                    res.status(200).json({status:200, msg: "successfully uploaded", image: imgpath })
                }
            });

        }

    },
    singleblog: (req, res) => {
        let id = req.params.id
        blogModel.findOne({ _id: id })
            .populate().exec((err, data)=> {
                if(err){
                    res.status(200).json({status:401,err:'Somthing went wrong'})
                }
                else{
                    res.status(200).json({status:200, singleblog: data})  
                }
            })
    },
    editblog: (req, res) => {
         let id = req.params.id;
        let title = req.body.title;
        let des = req.body.des;
       
        console.log(id)
        // let password = req.body.password;
        blogModel.findByIdAndUpdate({ _id: id }, { $set: {title:title, des: des } }, (err) => {
            if (err) {
                res.status(200).json({status:401,  err: err })
            }else{
            res.status(200).json({ msg: "Blog has Updated Succesfully" });
            }
        })
    }
    

}


module.exports = blogCtrl

