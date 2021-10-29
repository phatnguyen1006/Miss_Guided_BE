const express = require("express");
const router = express.Router();

const controller = require("../controllers/product.controller");

router.get("/", (req, res, next) => {
  res.status(404).json({ message: "Please insert the page number" });
});
router.get("/all", controller.getAllProducts);
router.get("/search", controller.searchProduct);
router.get("/:page", controller.filters, controller.getPagination);
router.get("/one/:id", controller.getOneProduct);

module.exports = router;
