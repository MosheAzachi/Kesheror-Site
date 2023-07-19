const express = require('express');
const orderController = require('./../controllers/orderController');
const router = express.Router();

router.post('/', orderController.addOrder);
router.get('/:id', orderController.getOrder);

module.exports = router;
