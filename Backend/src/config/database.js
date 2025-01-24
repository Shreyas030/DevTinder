const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
    await mongoose.connect('mongodb+srv://shreyas30:Shreyas1234@namaste.71tei.mongodb.net/DevTinder');
};

module.exports=connectDB;