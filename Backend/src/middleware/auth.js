const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {

    try {

        //Read the token from the req cookie and verify the user
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Token not found");
        }

        //validate the token
        const decodedMessage = jwt.verify(token, "DEV@Tinder$790");

        //Find the user based on the token
        const { _id } = decodedMessage;

        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found");
        }
        
        //Assign the user to the req object
        req.user = user;
        next();
    }
    catch(err) {
        res.status(400).send("Error: " + err.message);
    }

};
module.exports = { userAuth };
