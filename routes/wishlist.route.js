const express = require('express');
const router = express.Router();

const controller = require('../controllers/wishlist.controller');

router.post('/get', controller.getUserWishlist);

router.post('/add', controller.addToWishList);

router.post('/remove', controller.removeFromWishList);

module.exports = router;