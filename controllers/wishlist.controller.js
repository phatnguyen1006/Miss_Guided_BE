const userService = require('../services/user.service');

async function addToWishList(req, res) {
    const email = req.body.email;
    const productId = req.body.productId;

    const result = await userService.updateWishlist(email, productId);

    if (result) {
        res.status(200).json({user: result});
    } else {
        res.status(400).json({message: "Fail to add wishlist!!!"});
    }
}

async function removeFromWishList(req, res) {
    const email = req.body.email;
    const productId = req.body.productId;

    const result = await userService.removeFromWishList(email, productId);

    if (result) {
        res.status(200).json({user: result});
    } else {
        res.status(400).json({message: "Fail to remove from wishlist!!!"});
    }
}

module.exports = {
    addToWishList,
    removeFromWishList,
}