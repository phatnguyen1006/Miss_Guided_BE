const Products = require("../models/product.model");

// get add products
async function findAllProducts() {
  try {
    const products = await Products.find();

    if (products) console.log("Get all products successfully");

    return products;
  } catch (error) {
    console.log("Get all products failed");
  }
}

// get one product
async function findOneProduct(data) {
  try {
    const products = await Products.findOne(data);

    if (products) console.log("Get one product successfully");

    return products;
  } catch (error) {
    console.log("Get one product failed");
  }
}

async function findPagination(page) {
  let perPage = 8;

  try {
    const result = await Products.find()
      .skip(perPage * page - perPage) //skip every value 0
      .limit(perPage);

    return result;
  } catch (err) {
    console.log("Get pagination failed");
    throw err;
  }
}

async function findPaginationSwipe(page) {
  let perPage = 20;

  try {
    const result = await Products.find()
      .skip(perPage * page - perPage) //skip every value 0
      .limit(perPage);

    return result;
  } catch (err) {
    console.log("Get pagination swipe failed");
    throw err;
  }
}

async function searchByText(page, q) {
  var perPage = 8;
  try {
    const result = await Products.find({ name: RegExp(q, "i") })
      .skip(perPage * page - perPage) //skip every value 0
      .limit(perPage);
    // const result = await Products.find({ name: { $regex: q, $options: "i" } })
    //   .skip(perPage * page - perPage) //skip every value 0
    //   .limit(perPage);

    if (!result) {
      return null;
    }

    return result;
  } catch (err) {
    console.log("Fail to Search");
    throw err;
  }
}

async function filterByAttributes(page, data) {
  var perPage = 8;
  try {
    const result = await Products.find(data)
      .skip(perPage * page - perPage) //skip every value 0
      .limit(perPage);

    console.log(result.length);

    return result;
  } catch (err) {
    console.log("Fail to Filter");
    throw err;
  }
}

module.exports = {
  findAllProducts,
  findOneProduct,
  findPagination,
  findPaginationSwipe,
  searchByText,
  filterByAttributes,
};
