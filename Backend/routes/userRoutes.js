const router = require('express').Router()
const userCtrl = require('../controllers/userControllers')
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

router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)
router.post("/sociallogin", userCtrl.sociallogin)
router.post("/upload", upload, userCtrl.multer)
router.put("/changepassword/:id", userCtrl.changepass)
router.post("/sendmailotp", userCtrl.sendotp)
router.post("/forgotpassword", userCtrl.forgotpassword)
router.get('/getprofile/:email',userCtrl.getprofile)
router.put('/updprofile/:id', userCtrl.updateprofile)


module.exports = router