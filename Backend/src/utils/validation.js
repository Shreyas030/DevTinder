const validator = require('validator');

const validateSignup = (req, res, next) => {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName || !emailId || !password) {
        throw new Error("Please enter all the details");
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Invalid Email");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Password is weak");
    }
}
module.exports = { validateSignup, }
 