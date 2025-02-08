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
const validateEditProfileData = (req) => {
    const allowedUpdates = ["firstName", "lastName", "photoUrl", "gender", "age", "about", "skills"];

    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        throw new Error("Invalid updates");
    }
    return isValidOperation;
}
module.exports = { validateSignup, validateEditProfileData }
