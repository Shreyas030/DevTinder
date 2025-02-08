const express = require('express');
const requestRouter = express.Router();
const { validateSignup } = require("../utils/validation");
const User = require("../models/user");
const bycrypt = require("bcrypt");


// signup the user based on the request body
requestRouter.post("/signup", async (req, res) => {

    //saving the user to the database
    try {
        //validating the request body
        validateSignup(req);

        //encrypting the password
        const { password, firstName, lastName, emailId } = req.body;

        const passwordHash = await bycrypt.hash(password, 10);

        //creating a new instance of the User model
        const user = new User(
            {
                firstName,
                lastName,
                emailId,
                password: passwordHash
            }
        );
        await user.save();
        res.send("User created successfully");
    } catch (err) {
        res.status(400).send("Error : " + err.message);
    }

});

// post request to login the user based on the emailId and password 
requestRouter.post("/login", async (req, res) => {
    try {

        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {

            //generate the token for the user
            const token = await user.getJWT();

            //send the token as a cookie
            res.cookie("token", token, { httpOnly: true });
            res.send("Login Successful");
        }
        else {
            throw new Error("Invalid credentials");
        }
    }
    catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

//logout the user
requestRouter.post("/logout", async (req, res) => {
    // res.cookie("token", null, {
    //     expires: new Date(Date.now()),

    // });
    res.clearCookie("token");
    res.send("Logged out successfully");
})



module.exports = requestRouter;