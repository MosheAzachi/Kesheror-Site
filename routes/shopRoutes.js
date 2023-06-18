const express = require('express');
const shopController = require('./../controllers/shopController');

const router = express.Router();

router.param('id', shopController.checkID);

router.route('/').get(shopController.getAllItems).post(shopController.checkBody, shopController.createItem);

router.route('/:id').get(shopController.getItem).patch(shopController.updateItem).delete(shopController.deleteItem);

module.exports = router;
