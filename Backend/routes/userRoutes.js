const express = require('express');
const router = require('express').Router()
const userCtrl = require('../controllers/userControllers')
const path = require('path')
const multer = require('multer')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static(path.join(__dirname, "./public/")));
const { userSignupValidator, loginValidator } = require('../Helpers/Validation')
const { check, validationResult } = require('express-validator')
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
}).single('imagePath')

router.post('/register', upload, userSignupValidator, userCtrl.register)
router.post('/login', loginValidator, userCtrl.login)
router.post("/sociallogin", userCtrl.sociallogin)
router.post("/upload", upload, userCtrl.multer)
router.put("/changepassword/:id", userCtrl.changepass)
router.post("/sendmailotp", userCtrl.sendotp)
router.post("/forgotpassword", userCtrl.forgotpassword)
router.get('/getprofile/:email', userCtrl.getprofile)
router.put('/updprofile/:id', userCtrl.updateprofile)

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

router.get('/loginfirst', autenticateToken, (req, res) => {
    res.json({ "msg": "Token correct " })

})



module.exports = router