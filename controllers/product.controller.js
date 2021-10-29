const Products = require("../services/product.service");

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
  console.log(id);
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
  const { q } = req.query;
  console.log(q);

  if (!q) {
    return res.status(400).json({
      message: "Query Empty !!!",
    });
  }

  const result = await Products.searchByText(q);

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
  //   const { q } = req.query;

  if (!req.query) {
    next();
  }

  const result = await Products.filterByAttributes(req.query);

  if (!result) {
    return res.status(404).json({
      message: "Not found products !!!",
    });
  }

  return res.status(200).json({
    products: result,
  });
};
