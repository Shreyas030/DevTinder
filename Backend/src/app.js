const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignup } = require("./utils/validation");
const bycrypt = require("bcrypt");

app.use(express.json());

// post request to login the user based on the emailId and password 
app.post("/login", async (req, res) => {

    const { emailId, password } = req.body;

    try {
        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            return res.status(401).send("Invalid Email");
        }
        const isMatch = await bycrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send("Invalid Password");
        }
        res.send("Login Successful");
    }
    catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});


// signup the user based on the request body
app.post("/signup", async (req, res) => {

    //saving the user to the database
    try {
        //validating the request body
        validateSignup(req);

        //encrypting the password
        const { password, firstName, lastName, emailId } = req.body;

        const passwordHash = await bycrypt.hash(password, 10);
        console.log(passwordHash);

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

//fetching a user from the database based on the emailId
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const user = await User
            .findOne({ emailId: userEmail });

        if (!user) {
            res.status(400).send("Error in fetching user");
        }
        else {
            res.send(user);
        }
    }
    catch {
        res.status(400).send("Error in fetching user");
    }

});



//fetching all the users from the database and sending it as a response to the client 
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch {
        res.status(400).send("Error in fetching users");
    }
});



//deleting a user from the database based on the id
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");

    }
    catch {
        res.status(400).send("Error in deleting user");
    }

})

//updating a user in the database based on the id
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = ["photoUrl", "about", "skills", "age", "gender"];

        const isUpdateAllowed = Object.keys(data).every((update) => ALLOWED_UPDATES.includes(update));

        if (!isUpdateAllowed) {
            throw new Error("Invalid updates");
        }
        if (data?.skills.length > 10) {
            throw new error("Skills should not be more than 10");
        }

        const user = await User.findByIdAndUpdate(userId, data, { runValidators: true });
        res.send("User updated successfully");

    }
    catch (err) {
        res.status(400).send("Error : " + err.message);
    }
})

connectDB()
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
            console.log("Connecting to port 3000");

        });
    }).catch((err) => {
        console.log("Error connecting to MongoDB");
    });
