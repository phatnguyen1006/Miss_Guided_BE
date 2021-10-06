const express = require('express');
const router = express.Router();

const controller = require('../controllers/product.controller');

router.get('/all', controller.getAllProducts);
router.get('/:page', controller.getPagination);
router.get('/one/:id', controller.getOneProduct);

module.exports = router;