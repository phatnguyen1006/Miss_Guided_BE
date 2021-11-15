const Users = require("../models/user.model");
const { compare } = require("../helper/comparePassword");

async function registerUser(data) {
    try {
        const newUser = new Users(data); 
        
        const saveUser = await newUser.save();

        if (saveUser) console.log('Register successful');
        else console.log('Error in creating new user');

        return saveUser;
    } catch (error) {
        console.log("Error in creating user: ", error.message);
        throw error;
    }
}

async function loginUser(data) {
    try {
        const userFound = await Users.findOne({ email: data.email });

        if (userFound) {
            return compare(data.password, userFound.password) ? 200 : 401;
        }
        else {
            return null;
        }

        return userFound;
    } catch(err) {
        console.log("Error in login user: ", err.message);
    }
}

async function updateUser(email, data) {
    const userUpdate = await Users.findOneAndUpdate({
        email: email,
    }, data, {
        new: true
    }, (error) => {
        if(!err) console.log("Update user successful!");
        
        else console.log("Udate user failed!");
    });

    return userUpdate;
}

async function updateCart(email, newProductId) {
    // If Cart [] || Cart !- []
    try {
        const user = await Users.findOne({ email: email });

        user.cart.push(newProductId);
        await user.save();

        return user;
    } catch (err) {
        return null;
    }
}

async function updateWishlist(email, newProductId) {
    // If Cart [] || Cart !- []
    try {
        const user = await Users.findOne({ email: email });

        user.wishlist.push(newProductId);
        await user.save();

        return user;
    } catch (err) {
        return null;
    }
}

async function removeFromWishList(email, productId) {
    try {
        const user = await Users.findOne({ email: email });

        removeElement(user.wishlist, productId);
        await user.save();

        return user;
    } catch (err) {
        return null;
    }
}

function removeElement(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1) {
        array.splice(index, 1);
    }
}


module.exports = {
    registerUser,
    loginUser,
    updateUser,
    updateCart,
    updateWishlist,
    removeFromWishList,
};