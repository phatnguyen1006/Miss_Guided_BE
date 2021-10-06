const Users = require("../models/user.model");

async function registerUser(data) {
    try {
        const newUser = new Users(data); 
        
        const saveUser = await newUser.save();

        if (saveUser) console.log('Register successful');
        else console.log('Error in creating new user');

        return saveUser;
    } catch (error) {
        console.log("Error in creating user: ", error.message);
    }
}

async function loginUser(data) {
    try {
        const userFound = await Users.findOne(data) 

        if (userFound) console.log("Find user successfully");
        
        else console.log("Failed to find user");

        return userFound;
    } catch(err) {
        console.log("Error in login user: ", error.message);
    }
}

module.exports = {
    registerUser,
    loginUser,
};