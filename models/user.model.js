const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,  
            maxLenght: 50,
        }, 
        lastName: {
            type: String,
            required: true,
            maxLenght: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            maxLenght: 50,
        }, 
        password: {
            type: String,
            required: true,
            maxLenght: 50,
        }, 
        wishlist: {
            type: [String],
        }, 
        cart: {
            type: [String],
        }, 
        ordered: {
            type: [String],
        },
        dob: {
            type: String,
            default:"1/1/1980",
        }
    }
);

const Users = mongoose.model('Users', userSchema, 'users');

module.exports = Users;