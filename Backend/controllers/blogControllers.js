const blogModel = require('../models/blogSchema')
const { check, validationResult } = require('express-validator')

const blogCtrl = {
    // create blogs
    addblog: (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                // return res.status(422).json({ errors: errors.array() })
                res.status(200).json({ status: 401, "err": "Something went Wrong Enter Valid Input!!" })
                console.log(errors.array())
            }
            else {
                // console.log(req.body)
                let title = req.body.title;
                let des = req.body.des;
                let tags = req.body.tags;
                let email = req.body.email;
                let myImage = (req.file) ? req.file.filename : null;

                let ins = new blogModel({ title: title, des: des, tags: tags, email: email, myImage: myImage });
                // console.log(ins)
                ins.save((err) => {
                    if (err) {
                        res.json({ "err": "Please fill the form" })
                    }
                    else {
                        res.json({ "msg": "Blog added successfully" })

                    }
                })
            }
        }
        catch (err) {
            res.status(500).json({ err: 'Please try again later', });
        }
    },
    // fectching all blogs data
    getAllBlogsdata: (req, res) => {
        try {
            blogModel.find({}, (err, data) => {
                if (err) {
                    res.status(200).json({ status: 401, err: 'Somthing went wrong' })
                }
                else {
                    res.status(200).json({ status: 200, blogdata: data })
                }
            })
        } catch (err) {
            res.status(500).json({ err: 'Please try again later', });
        }

    },
    // fetching particular user blog data
    getBlogdata: (req, res) => {
        try {
            let email = req.params.email;
            // console.log(email)
            blogModel.find({ email: email }, (err, data) => {
                if (err) {
                    res.status(200).json({ status: 401, err: err })
                }
                else {
                    res.status(200).json({ status: 200, blogdata: data })
                }
            })
        }
        catch (err) {
            res.status(500).json({ err: 'Please try again later', });
        }
    },
    // uploading image in blogs
    multer: (req, res) => {
        try {
            console.log(req.file)
            if (req.file) {
                console.log(req.file)
                console.log(req.body)
                let imgpath = req.file.filename;

                blogModel.updateOne({ email: req.body.email }, { $set: { blogProfile: imgpath } }, (err) => {
                    if (err) {
                        res.status(200).json({ status: 401, err: "error msg" })
                    }
                    else {
                        res.status(200).json({ status: 200, msg: "successfully uploaded", image: imgpath })
                    }
                });
            }
        }
        catch (err) {
            res.status(500).json({ err: 'Please try again later', });
        }

    },
    // fecthing single blog data for preview
    singleblog: (req, res) => {
        try {
            let id = req.params.id
            blogModel.findOne({ _id: id })
                .populate().exec((err, data) => {
                    if (err) {
                        res.status(200).json({ status: 401, err: 'Somthing went wrong' })
                    }
                    else {
                        res.status(200).json({ status: 200, singleblog: data })
                    }
                })
        }
        catch (err) {
            res.status(500).json({ err: 'Please try again later', });
        }
    },
    // edit code for blogs
    editblog: (req, res) => {
        try {
            let id = req.params.id;
            let title = req.body.title;
            let des = req.body.des;
            let tags = req.body.tags
            console.log(req.body)
            console.log(id)
            // let password = req.body.password;
            blogModel.findByIdAndUpdate({ _id: id }, { $set: { title: title, des: des, tags: tags } }, (err) => {
                if (err) {
                    res.status(200).json({ status: 401, err: err })
                } else {
                    res.status(200).json({ msg: "Blog has Updated Succesfully" });
                }
            })
        } catch (err) {
            res.status(500).json({ err: 'Please try again later', });
        }
    },
    // searching blogs 
    searchByQueryType: async (req, res) => {
        const { type, query } = req.body;
        try {
            let products;
            switch (type) {
                case 'text':
                    products = await blogModel.find({ $text: { $search: query } });
                    break;
            }
            if (!products.length > 0) {
                products = await blogModel.find({});
            }
            res.json({ products });
            console.log(products)
        } catch (err) {
            console.log(err, 'filter Controller.searchByQueryType error');
            res.status(500).json({ err: 'Please try again later', });
        }
    }

}


module.exports = blogCtrl

