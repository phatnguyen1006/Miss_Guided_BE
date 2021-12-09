const Products = require("../models/product.model");

/**
 * Some @Products have price: 0
 * @input : { price: 0 }
 * @remove the @faultProducts
 * @test : use @find method
 */

const fetchAllCategories = async (req, res) => {
  try {
    let categories = [];
    let sizes = [];
    let perPage = 50;

    const result = await Products.find({
      categories: { $gt: [] },
      sizes: { $gt: [] },
    })
      .limit(perPage)
      .then((res) => {
        res.forEach((r) => {
          categories.push(r.categories);
          sizes.push(r.sizes);
        });
        return categories;
      });

    console.log("aa", categories);

    if (result) {
      res.status(200).json({ categories: categories, sizes: sizes });
    }
  } catch (err) {
    throw err;
  }
};

module.exports = fetchAllCategories;
