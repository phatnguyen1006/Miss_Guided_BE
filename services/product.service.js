const Products = require('../models/product.model');

// get add products
async function findAllProducts() {
    try {
        const products = await Products.find();

        if (products) console.log("Get all products successfully");

        return products;
    } catch(error) {
        console.log("Get all products failed");
    }
};

// get one product
async function findOneProduct(data) {
    try {
        const products = await Products.findOne(data);

        if (products) console.log("Get one product successfully");

        return products;
    } catch(error) {
        console.log("Get one product failed");
    }
};

async function findPagination(page) {
    let perPage = 8;
    
    try {
        const result = await Products
                                .find()
                                .skip((perPage * page) - perPage) //skip every value 0
                                .limit(perPage)
        
        return result;
    } catch(err) {
        console.log("Get pagination failed");
        throw err;
    }
}


module.exports = {
    findAllProducts,
    findOneProduct,
    findPagination,
};