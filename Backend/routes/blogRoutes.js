const router = require('express').Router()
const blogCtrl = require('../controllers/blogControllers')
const path = require('path')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'E:/privateblogging/public/images')

    },
    filename: (req, file, cb) => {
        const filename = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
        cb(null, filename)
    }
})

const upload = multer({
    storage: storage, fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        }
        else {
            req.fileValidationError = "Forbidden extension"
            cb(null, false, req.fileValidationError);
        }
    }

}).single('file');


router.post("/upload", upload, blogCtrl.multer)
router.post("/addblog",blogCtrl.addblog)
router.get('/getblogdata/:email',blogCtrl.getBlogdata)
router.route('/allblogs').get(blogCtrl.getAllBlogsdata)
router.route("/singleblog/:id").get(blogCtrl.singleblog)
router.post("/editblog/:id", blogCtrl.editblog)


module.exports = router