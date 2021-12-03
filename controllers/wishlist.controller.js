const userService = require('../services/user.service');
const productService = require('../services/product.service');

async function getUserWishlist(req, res) {
    const email = req.body.email;

    const user = await userService.findUser(email);
    let result = [];

    for (let productId of user.wishlist) {
        const product = await productService.findOneProduct({_id: productId});
        result.push(product);
    }

    res.status(200).json({products: result});
}

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
    getUserWishlist,
}