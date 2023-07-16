const express = require('express');

const cartItemController = require('../controllers/cartController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .post(authController.protect, authController.restrict, cartItemController.createItem);

router
  .route('/:id')
  .get(cartItemController.getCart());

module.exports = router;
