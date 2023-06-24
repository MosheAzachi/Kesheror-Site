const express = require('express');

const shopController = require('./../controllers/shopController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/').get(authController.protect, shopController.getAllItems).post(shopController.createItem);

router.route('/:id').get(shopController.getItem).patch(shopController.updateItem).delete(shopController.deleteItem);

module.exports = router;
