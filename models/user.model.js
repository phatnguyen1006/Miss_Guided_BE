const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            default: "Unknown FirstName",
            maxLenght: 50,
        }, 
        lasttName: {
            type: String,
            required: true,
            default: "Unknown Lastname",
            maxLenght: 50,
        },
        email: {
            type: String,
            required: true,
            default: "Unknown Email",
            maxLenght: 50,
        }, 
        password: {
            type: String,
            required: true,
            default: "Unknown Password",
            maxLenght: 50,
        }
    }
);

const Users = mongoose.model('Users', userSchema, 'users');

module.exports = Users;