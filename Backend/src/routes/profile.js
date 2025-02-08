const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validation");

const validator = require('validator');
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");


// get profile of the user 
profileRouter.get("/profile/view", userAuth, async (req, res) => {

    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("Error: " + err);
    }
});

//update profile of the user
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {

    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid updates");
        }
        const loggedInUser = req.user;

        const updates = Object.keys(req.body);

        updates.forEach((update) => {
            loggedInUser[update] = req.body[update];
        });

        await loggedInUser.save();

        res.json({
            message: `Profile updated for ${loggedInUser.firstName}`,
            user: loggedInUser
        });

    } catch (err) {
        res.status(400).send("Error: " + err);
    }
});

//changing the password of the user 
profileRouter.patch("/profile/change_password", userAuth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const { token } = req.cookies;

        if (!newPassword) throw new Error("New password is required");
        if (!token) throw new Error("Token not found");

        const decoded = jwt.verify(token, "DEV@Tinder$790");

        const user = await User.findById(decoded._id);
        if (!user) throw new Error("User not found");

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) throw new Error("Incorrect password");

        if (!validator.isStrongPassword(newPassword)) throw new Error("Password is weak");

        const passwordHash = await bcrypt.hash(newPassword, 10);
        user.password = passwordHash;

        await user.save();
        res.send("Succesfully Updated Password");
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
})

module.exports = profileRouter;


