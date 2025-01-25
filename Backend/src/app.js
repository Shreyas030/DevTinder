const express = require("express");
const connectDB = require("./config/database");
const app = express();

const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {

    //creating a new instance of the User model
    const user = new User(req.body);

    //saving the user to the database
    try {
        await user.save();
        res.send("User created successfully");
    } catch {
        res.status(400).send("Error in creating user");
    }

});



connectDB()
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
            console.log("Connecting to port 3000");

        });
    }).catch((err) => {
        console.log("Error connecting to MongoDB");
    });
