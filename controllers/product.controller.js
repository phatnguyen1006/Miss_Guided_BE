const Products = require("../services/product.service");
const convertPrice = require("../helper/converPrice");
const sortEnum = require("../interface/sortEnum");

module.exports.getAllProducts = async (req, res) => {
  const allProducts = await Products.findAllProducts();

  if (allProducts) {
    // const JSONProducts = JSON.stringify(allProducts);
    // return res.status(200).json(JSONProducts);
    return res.status(200).json({ products: allProducts });
  } else {
    return res.status(400).json({ message: "Failed to get all products" });
  }
};

module.exports.getOneProduct = async (req, res) => {
  const id = req.params.id;
  //console.log(id);
  const findProduct = await Products.findOneProduct({ _id: id });

  if (findProduct) {
    // const JSONProduct = JSON.stringify(findProduct);
    // res.status(200).json(JSONProduct);
    return res.status(200).json({ products: findProduct });
  } else {
    res.status(401).json({ message: "No product matches" });
  }
};

module.exports.getPagination = async (req, res) => {
  const page = req.params.page;

  const products = await Products.findPagination(page);
  console.log("Running");
  if (!products)
    return res
      .status(400)
      .json({ message: "Faild to get pagination products" });
  else {
    // const JSONProducts = JSON.stringify(products);
    return res.status(200).json({ products: products });
  }
};

module.exports.getPaginationSwipe = async (req, res) => {
  const page = req.params.page;

  const products = await Products.findPaginationSwipe(page);
  //console.log(products.length);
  if (!products)
    return res
      .status(400)
      .json({ message: "Faild to get pagination products" });
  else {
    // const JSONProducts = JSON.stringify(products);
    return res.status(200).json({ products: products });
  }
};

module.exports.searchProduct = async (req, res) => {
  const { q, page } = req.query;
  //console.log(q);

  if (!q) {
    return res.status(400).json({
      message: "Query Empty !!!",
    });
  }

  const result = await Products.searchByText(page, q);

  if (!result) {
    return res.status(404).json({
      message: "No result matched !!!",
      products: result,
    });
  }

  return res.status(200).json({
    products: result,
  });
};

module.exports.filters = async (req, res, next) => {
  // const { q } = req.query;
  const page = req.params.page;

  if (!req.query) {
    next();
  }

  const result = await Products.filterByAttributes(page, req.query);

  if (!result) {
    return res.status(404).json({
      message: "Not found products !!!",
    });
  }

  if (result && req.query.sort) {
    if (req.query.sort == sortEnum[0]) {
      // Do nothing
      return res.status(200).json({
        products: result,
      });
    } else if (req.query.sort == sortEnum[1]) {
      // low to high

      result.sort((a, b) => convertPrice(a.price) - convertPrice(b.price));

      return res.status(200).json({
        products: result,
      });
    } else if (req.query.sort == sortEnum[2]) {
      // high to low
      result.sort((a, b) => convertPrice(b.price) - convertPrice(a.price));

      return res.status(200).json({
        products: result,
      });
    } else {
      // Do nothing
      return res.status(200).json({
        products: result,
      });
    }
  } else {
    // Do nothing
    return res.status(200).json({
      products: result,
    });
  }
};
