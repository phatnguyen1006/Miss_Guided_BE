const Products = require('../services/product.service');

module.exports.getAllProducts = async (req, res) => {
    const allProducts = await Products.findAllProducts();

    if (allProducts) {
        return res.status(200).json({"products": allProducts});
    } else {
        return res.status(400).json({"message": "Failed to get all products"});
    }
}

module.exports.getOneProduct = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const findProduct = await Products.findOneProduct({_id: id});
    
    if (findProduct) {
        res.status(200).json({ "products": findProduct });
    } else {
        res.status(401).json({"message": "No product matches"});
    }
}

module.exports.getPagination = async (req, res) => {
    var isNextPage = true;
    const page = req.params.page;
    
    const products = await Products.findPagination(page);
    const nextPageProduct = await Products.findPagination(page+1);
    
    if (nextPageProduct.length == 0) {
        isNextPage = false;
    }

    if (!products) return res.status(400).json({"message": "Faild to get pagination products"});
    else {
        // const JSONProducts = JSON.stringify(products);
        return res.status(200).json({ "products": products, "isNextPage": isNextPage });
    }
}