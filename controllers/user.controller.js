const userService = require('../services/user.service');

module.exports.postRegister = async (req, res) => {
    const UserData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        email: req.body.email, 
        password: req.body.password,
        wishlist: req.body.wishlist,
        cart: req.body.cart,
        dob: req.body.dob,
    };

    const isEmailExisted = await userService.loginUser({email: req.body.email});
    if (isEmailExisted) {
        res.status(401).json({"isSuccess": false});
        return;
    }

    //Register user
    const registeredUser = await userService.registerUser(UserData);

    if (registeredUser) {
        res.status(200).json({"isSuccess": true});
    } else {
        res.status(400).json({"isSuccess": false});
    }
}

module.exports.postLogin = async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    
    let findUser = await userService.loginUser({email: email});
    
    if (findUser) {
        if (findUser.password != password) {
            res.status(401).json({"isSuccess": false});
        } else {
            res.status(200).json({"isSuccess": true});
        }

        return;
    } else {
        res.status(200).json({"isSuccess": false});
        return;
    }
}