const mongoose = require('mongoose');
const validator = require('validator');

// User schema creation
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 4,
            maxLength: 20,
        },
        lastName: {
            type: String,
        },
        emailId: {
            type: String,
            lowercase: true,
            required: true,
            unique: true,
            trim: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid Email");
                }
            }
        },
        password: {
            type: String,
            required: true,
            validate(value) {
                if (!validator.isStrongPassword(value)) {
                    throw new Error("password is weak");
                }
            }

        },
        age: {
            type: Number,

        },
        gender: {
            type: String,
            validate(value) {
                if (!["male", "female", "others"].includes(value)) {
                    throw new Error("Invalid Gender");
                }
            },
        },
        photoUrl: {
            type: String,
        },
        about: {
            type: String,
            default: "Hey there! I am using Social Media App",

        },
        skills: {
            type: [String],
        },
    },
    {
        timestamps: true,
    }
);

// User model creation 
const User = mongoose.model('User', userSchema);
module.exports = User;