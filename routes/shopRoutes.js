const express = require('express');

const shopController = require('./../controllers/shopController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/items-on-sale').get(shopController.getItemsOnSale);

router
  .route('/')
  .get(authController.protect, shopController.getAllItems)
  .post(authController.protect, authController.restrict, shopController.createItem);

router
  .route('/:id')
  .get(shopController.getItem)
  .patch(authController.protect, authController.restrict, shopController.updateItem)
  .delete(authController.protect, authController.restrict, shopController.deleteItem);

module.exports = router;
