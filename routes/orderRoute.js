const express = require('express');
const cartController = require('./../controllers/cartController');
const orderController = require('./../controllers/orderConroller');
const router = express.Router();

router.post('/', orderController.addOrder);
router.get('/:id',orderController.getOrder);
//router.delete('/:id', cartController.deleteMyCart);

module.exports = router;