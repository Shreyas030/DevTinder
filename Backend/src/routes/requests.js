const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");


requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;

    console.log("Sending connection request");

    res.send(user.firstName + " " + user.lastName + " has sent a connection request");

});

module.exports = requestRouter;