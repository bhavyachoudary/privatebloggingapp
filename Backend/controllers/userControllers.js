const Users = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtSecret = "ddsfftyy677yttfff";
const otpModel = require("../models/otpSchema");
const { check, validationResult } = require('express-validator')

const userCtrl = {
    register: async (req, res) => {
        // user registration
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                // return res.status(422).json({ errors: errors.array() })
                res.status(200).json({ status: 401, "err": "Something went Wrong Enter Valid Input!!" })
                console.log(errors.array())
            }
            else {
                let name = req.body.name;
                let lname = req.body.lname;
                let email = req.body.email;
                let password = req.body.password;
                let imagePath = (req.file) ? req.file.filename : null;
                const passwordHash = await bcrypt.hash(password, 10)
                let ins = new Users({ name: name, lname: lname, email: email, password: passwordHash, imagePath: imagePath });
                await ins.save((err) => {
                    if (err) {
                        res.status(200).json({ status: 401, "err": "Please fill the form" })
                    }
                    else {
                        res.status(200).json({ status: 200, "msg": "Registered successfully" })
                    }
                })
            }
        } catch (err) {
            res.status(500).json({ err: 'Please try again later' });
        }

    },
    // user login
    login: async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                // return res.status(422).json({ errors: errors.array() })
                res.status(200).json({ status: 401, "err": "Something went Wrong Enter Valid Input!!" })
                console.log(errors.array())
            }
            else {
                let email = req.body.email;
                let password = req.body.password;
                const user = await Users.findOne({ email: email })
                if (user) {
                    const isMatch = await bcrypt.compare(password, user.password)
                    console.log(isMatch)
                    if (email === user.email && isMatch) {
                        let payload = {
                            uid: email
                        }
                        const token = jwt.sign(payload, jwtSecret, { expiresIn: 3600009 })
                        res.status(200).json({ status: 200, "msg": "Login Successfull", "token": token })
                    }
                    else {
                        res.status(200).json({ status: 401, "err": 'You must enter a password correct.' })
                    }
                }
                else {
                    res.status(200).json({ status: 401, "err": "Please Enter valid credintails" })
                }
            }
        } catch (err) {
            res.status(500).json({ err: 'Please try again later' });
        }

    },
    // social login for user
    sociallogin: async (req, res) => {
        console.log(req.body)
        let name = req.body.name;
        let lname = req.body.lname;
        let email = req.body.email;
        let password = "bhavyasociallogin";

        const passwordHash = await bcrypt.hash(password, 10)
        Users.findOne({ email: req.body.email }).exec((err, data) => {
            if (err) {
                res.status(200).json({ status: 401, "msg": "Somethong Went Wrong" })
            }
            else if (data == null) {
                let ins = new Users({ name: name, lname: lname, email: email, password: passwordHash, imagePath: 'c.jpg' });
                ins.save((err) => {
                    if (err) {
                        res.status(200).json({ status: 401, "msg": "Somethong Went Wrong" })
                    }
                    else {
                        let payload = {
                            uid: email
                        }
                        const token = jwt.sign(payload, jwtSecret, { expiresIn: 3600009 })
                        res.status(200).json({ status: 200, "msg": "Login Successfull", "token": token })

                    }
                })
            }
            else {
                res.status(200).json({ status: 200, "msg": "This is an Email Registered For Login " })
            }
        })


    },
    // fecthing profile details
    getprofile: (req, res) => {
        try {
            let email = req.params.email;
            console.log(email)
            Users.findOne({ email: email }, (err, data) => {
                if (err) {
                    res.status(200).json({ status: 401, err: err })
                }
                else {
                    res.status(200).json({ status: 200, user: data })
                }
            })
        }
        catch (err) {
            res.status(500).json({ err: 'Please try again later' });
        }

    },
    // profile upload in registration form
    multer: (req, res) => {
        console.log(req.file)
        if (req.file) {
            console.log(req.file)
            console.log(req.body)
            let imgpath = req.file.filename;

            Users.updateOne({ email: req.body.email }, { $set: { imagePath: imgpath } }, (err) => {
                if (err) {
                    res.status(200).json({ status: 401, err: "error msg" })
                }
                else {
                    res.status(200).json({ status: 200, msg: "successfully uploaded", image: imgpath })
                }
            });

        }

    },
    // user can update thier profile
    updateprofile: (req, res) => {
        try {
            let id = req.params.id;
            let name = req.body.name;
            let lname = req.body.lname;
            let email = req.body.email;

            console.log(name)
            // let password = req.body.password;
            Users.updateOne({ _id: id }, { $set: { name: name, lname: lname, email: email } }, (err) => {
                if (err) {
                    res.status(200).json({ status: 401, err: err })
                } else {
                    res.status(200).json({ msg: "Userprofile has Updated Succesfully" });
                }
            })
        } catch (err) {
            res.status(500).json({ err: 'Please try again later' });

        }

    },
    // forgot password
    forgotpassword: async (req, res) => {
        try {
            let data = await otpModel.find({ email: req.body.email, code: req.body.otpcode })

            if (data) {
                let currentTime = new Date().getTime();
                let diff = data.expiresIn - currentTime;
                if (diff < 0) {
                    res.status(200).json({ "msg": "Token Expires" })
                } else {
                    let user = await Users.findOne({ email: req.body.email })
                    user.password = req.body.password;
                    // user.confirmpassword=req.body.password;
                    const salt = await bcrypt.genSalt(10);
                    let hashpassword = await bcrypt.hash(user.password, salt);
                    user.password = hashpassword;
                    user.save();
                    res.status(200).json({ status: 200, "msg": "Password Changed Successfully" })
                }
            }
            else {
                res.status(200).json({ status: 401, "msg": "Invalid Otp" })
            }
        }
        catch (err) {
            res.status(500).json({ err: 'Please try again later' });

        }

    },
    // send otp using mail
    sendotp: async (req, res) => {
        //console.log(req.body.email);
        try {
            let data = await Users.findOne({ email: req.body.email });
            if (data) {
                let otpcode = Math.floor((Math.random() * 10000) + 1);
                console.log(otpcode)
                let otpData = new otpModel({
                    email: req.body.email,
                    code: otpcode,
                    expiresIn: new Date().getTime() + 300 * 1000
                })
                let otpResponse = await otpData.save();
                sendmail(otpcode, req.body.email)
                res.status(200).json({ status: 200, "msg": "OTP sent to Email", otpcod: otpcode })
            } else {
                res.status(200).json({ status: 401, "msg": "Email ID doesnt Exist" })
            }
        } catch (err) {
            res.status(500).json({ err: 'Please try again later' });

        }
    },
    // change password 
    changepass: async (req, res) => {
        try {
            let id = req.params.id;
            let fname = req.body.fname;
            let lname = req.body.lname;
            let email = req.body.email;
            let password = req.body.password;
            let phone = req.body.phone;
            let gender = req.body.gender;
            const salt = await bcrypt.genSalt(10);
            let hashpassword = await bcrypt.hash(password, salt);
            Users.updateOne({ _id: id }, {
                $set: {
                    fname: fname, lname: lname, email: email, password: hashpassword,
                    phone: phone, gender: gender
                }
            }, (err) => {
                if (err) {
                    res.status(200).json({ status: 401, err: err })
                } else {
                    res.status(200).json({ status: 200, msg: "Updated Succesfully" });
                }

            })

        }
        catch (err) {
            res.status(500).json({ err: 'Please try again later' });

        }
    }
}
// nodemailer for sending otp
const nodemailer = require('nodemailer')
function sendmail(otpcode, email) {

    console.log(email)
    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'bhavyachoudary3@gmail.com',
            pass: 'Bhavya@94',
        },
        tls: {
            rejectUnAuthorized: true
        }
    });
    let mailDetails = {
        from: 'bhavyachoudary3@gmail.com',
        to: `${email}`,
        subject: 'OTP for NeoSTORE',
        text: `YOUR OTP IS ${otpcode}`,
    };
    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent successfully');
        }
    });
}


module.exports = userCtrl

