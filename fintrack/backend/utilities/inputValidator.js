const { check, validationResult } = require('express-validator')

exports.applyValidationRules = (endpoint) => {
    console.log("endpoint: ", endpoint);
    switch (endpoint) {
        case '/signup': {
            return [
                check('username').isLength({min: 5}).withMessage("The username should be at least five characters long"),
                check('password').isLength({min: 5}).withMessage("Your password should be at least five characters long"),
                check('email').isEmail().withMessage("Please write a valid email"),
            ]
        }
        case "/signin": {
            return [
                check('username').isLength({min: 5}).withMessage("The username should be at least five characters long"),
                check('password').isLength({min: 5}).withMessage("Your password should be at least five characters long"),
            ]
        }
        case "/profile/salary": {
            return [
                check('username').isLength({min: 5}).withMessage("Invalid username"),
                check('salary').isNumeric().withMessage("The salary should be a number"),
            ]
        }
        case "/profile/email": {
            return [
                check('username').isLength({min: 5}).withMessage("Invalid username"),
                check('email').isEmail().withMessage("Invalid Email"),
            ]
        }
    }
};

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = [];

    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    })
};