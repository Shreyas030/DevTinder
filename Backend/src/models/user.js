const mongoose = require('mongoose');

// User schema creation
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
    },
    password: {
        type: String,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    }

});

// User model creation 
const User= mongoose.model('User', userSchema);
module.exports = User;