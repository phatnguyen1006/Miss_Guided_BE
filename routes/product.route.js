const express = require('express');
const router = express.Router();

const controller = require('../controllers/product.controller');

router.get('/', controller.getOneProduct);
router.get('/all', controller.getAllProducts);

module.exports = router;