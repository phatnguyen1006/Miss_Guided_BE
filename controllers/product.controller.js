const Products = require('../services/product.service');

module.exports.getAllProducts = async (req, res) => {
    const allProducts = await Products.findAllProducts();

    if (allProducts) {
        const JSONProducts = JSON.stringify(allProducts);
        res.status(200).json(JSONProducts);
    } else {
        res.status(400).json('[]');
    }
}

module.exports.getOneProduct = async (req, res) => {
    const name = req.body.name;

    const findProduct = await Products.findOneProduct({name: name});
    
    if (findProduct) {
        const JSONProduct = JSON.stringify(findProduct);
        res.status(200).json(JSONProduct);
    } else {
        res.status(401).json('');
    }
}