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
        res.status(401).json({"message": "Exsisted Email !!"});
        return;
    }

    //Register user
    const registeredUser = await userService.registerUser(UserData);

    if (registeredUser) {
        res.status(200).json({"message": "Register Successfully !!!"});
    } else {
        res.status(400).json({"message": "Fail to register!!!"});
    }
}

module.exports.postLogin = async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    
    let findUser = await userService.loginUser({email: email});
    
    if (findUser) {
        let JSONUser = JSON.stringify(findUser);
        res.status(200).json(JSONUser);
        return;
    } else {
        res.status(401).json('');
        return;
    }
}

module.exports.addToCart = async (req, res) => {
    const { email, newProduct } = req.body;

    const onUpdateCart = await userService.updateCart(email, newProduct);
    
    if (onUpdateCart) {
        res.status(200).json({ "message": onUpdateCart });
    } else {
        res.status(400).json({ "message": "Add to cart failed !!!" });
    }
}

module.exports.addToWishlist = async (req, res) => {
    var wishlist = req.body.wishlist 
    wishlist.push(req.body.newProduct);
    
    var email = req.body.email;

    const UserData = {
        wishlist: wishlist,
    };

    const updateUser = userSercvice.updateUser(email, UserData);

    if (updateUser) {
        const JSONUserData = JSON.stringify(updateUser);
        console.log("Update user successfully");
        res.status(200).json(JSONUserData);
    } else {
        console.log("Update user failed");
        res.status(401).json('');
    }
}