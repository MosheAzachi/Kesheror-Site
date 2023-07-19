const express = require('express');
const cartController = require('./../controllers/cartController');
const orderController = require('./../controllers/orderConroller');
const router = express.Router();

router.post('/payment', orderController.addOrder);
//router.get('/',orderController.getOrder);
//router.delete('/:id', cartController.deleteMyCart);

module.exports = router;