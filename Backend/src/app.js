const express = require("express");

const app = express();

const { adminAuth } = require("./middleware/auth");
//Handle Auth Middleware for all Get Post Put Delete Requests
app.use("/admin", adminAuth);

app.get("/admin/getalldata", (req, res) => {
    res.send("All data Sent!!");
});
app.get("/admin/deleteUser", (req, res) => {
    res.send("Deleted a user!!");
});





app.listen(3000, () => {
    console.log("Connecting to port 3000");

});