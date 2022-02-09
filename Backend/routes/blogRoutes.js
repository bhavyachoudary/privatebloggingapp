const express = require('express');
const router = require('express').Router()
const blogCtrl = require('../controllers/blogControllers')
const path = require('path')
const multer = require('multer')
// const { blogValidator } = require('../Helpers/Validation')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static(path.join(__dirname, "./public/")))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "E:/privateblogging/public/images");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});
let upload = multer({
    storage: storage,
}).single('myImage')

function autenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (token == null) {
        res.json({ "err": "Token not match" })
    }
    else {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.json({ "err": "Token incorrect" })
            }
            else {
                res.json({ "msg": " Token Matched" })
                next();
            }
        })
    }
}

// all routes related to blogs
router.post("/addblog", upload, blogCtrl.addblog)
router.get('/getblogdata/:email', blogCtrl.getBlogdata)
router.get('/allblogs', blogCtrl.getAllBlogsdata)
router.get("/singleblog/:id", blogCtrl.singleblog)
router.post("/editblog/:id", blogCtrl.editblog)
router.post('/search', blogCtrl.searchByQueryType);


module.exports = router