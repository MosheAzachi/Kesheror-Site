const mongoose = require('mongoose');
const Item = require('../../Kesheror-Site/models/itemModel');
const cartItems = require('../../Kesheror-Site/models/cartModel');

const ordersSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'you must have a user in order to start a cart.']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required: [true, 'you must have a user in order to start a cart.']
  },
  address: {
    type: 'string',
    required: [true, 'you must insert an address in order to complete your order.']
  },
  phone: {
    type: 'string',
    required: [true, 'you must enter a phone number in order to complete your order.']
  },
  cart: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'cart',
    required: true
  }
});

const Orders = mongoose.model('orders', ordersSchema);

module.exports = Orders;