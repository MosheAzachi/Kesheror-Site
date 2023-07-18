const express = require('express');
const cartController = require('./../controllers/cartController');
const router = express.Router();
router.post('/', cartController.addToCart);
//router.get('api/cart/size',cartController.cartSize);

module.exports = router;