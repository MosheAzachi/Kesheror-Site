const mongoose = require('mongoose');
const Item = require('./productModel');
const cartItems = require('./cartModel');

const ordersSchema = new mongoose.Schema({
  orderId: {
    type: 'number',
    required: [true, 'you must have a user in order to start a cart.']
  },
  userId: {
    type: 'string',
    unique : true,
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
  items: {
    type: Array,

  }
});


const Orders = mongoose.model('orders', ordersSchema);

module.exports = Orders;