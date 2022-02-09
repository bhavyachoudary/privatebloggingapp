const { check, validationResult } = require('express-validator')

exports.userSignupValidator = [
    check('name')
        .notEmpty()
        .withMessage('FirstName is should be atleast 3 chars'),
    check('lname')
        .notEmpty()
        .withMessage(('LastName is should be atleast 3 chars')),
    check('email')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min: 4,
            max: 32
        }),
    check('password')
        .notEmpty(),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number')

]
exports.loginValidator = [
    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Must be a valid email address'),
    check('password')
        .notEmpty()
        .withMessage('Password must contain at least 6 characters'),
]

exports.blogValidator = [
    check('title', 'title is required').notEmpty(),
    check('des', 'Description is required').notEmpty(),
    check('tags', 'Tags are required').notEmpty()
]



