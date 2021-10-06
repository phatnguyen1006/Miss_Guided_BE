const productService = require("../models/product.model");

createProududct = async (data) => {
    try {
        const newProduct = new productService(data);

    const productCheck = await newProduct.save();

    if (productCheck) return 200;
    else return 401;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = createProududct;