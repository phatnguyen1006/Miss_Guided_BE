const Products = require("../models/product.model");

/**
 * Some @Products have price: 0
 * @input : { price: 0 }
 * @remove the @faultProducts
 * @test : use @find method
 */

const clearFreeProducts = async (req, res) => {
  // const result = await Products.deleteMany({ price: 0 });
  const result = await Products.find({ price: 0 });

  if (result) {
    res.status(200).json({ Products: result });
  }
};

module.exports = clearFreeProducts;
