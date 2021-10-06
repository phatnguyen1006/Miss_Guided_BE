const express = require('express');
const router = express.Router();

const controller = require('../controllers/user.controller');

router.post('/addToCart', controller.addToCart);
router.post('/addToWishlist', controller.addToWishlist);

module.exports = router;