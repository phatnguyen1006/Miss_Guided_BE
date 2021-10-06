const mongoose = require('mongoose');

// images ->  URL array 
// price on sale - salePrice
// actual price - price
// name 
// sizes -> string array
// description

const productSchema = new mongoose.Schema(
    {
        images: {
            type: [String],
            default: ["No Image"],
        }, 
        name: {
            type: String, 
            default: "Unknown Product",
        }, 
        price: {
            type: String,
            default: "Unknown Price",
        }, 
        salePrice: {
            type: String,
            default: "Unknown Price",
        }, 
        sizes: {
            type: [String],
            default: ["Out of Stock"]
        },
        description: {
            type: String, 
            default: "This product has got any desciption",
        }, 
        category: {
            type: String, 
            default: "Unknown category",
        },
    }
);

const Products = mongoose.model('Products', productSchema, 'products');

module.exports = Products;
