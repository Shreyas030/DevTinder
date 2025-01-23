const adminAuth = (req, res, next) => {
    console.log("Admin auth is getting checked!!");
    const token = "xyz";
    const isAdminAuthenticated = token === "xyz";
    if (!isAdminAuthenticated) {
        res.status(401).send("Admin not authenticated!!");
    }
    else {
        next();
    }
};
module.exports = {adminAuth};
    