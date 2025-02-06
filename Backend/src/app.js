const express = require("express");
const connectDB = require("./config/database");
const app = express();

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);




connectDB()
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
            console.log("Connecting to port 3000");

        });
    }).catch((err) => {
        console.log("Error connecting to MongoDB" + err);
    });
//29