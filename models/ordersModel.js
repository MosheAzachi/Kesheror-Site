const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  fullName: {
    type: String,
    required: [true, 'you must insert an full name in order to complete your order.']
  },
  address: {
    type: String,
    required: [true, 'you must insert an address in order to complete your order.']
  },
  phone: {
    type: String,
    required: [true, 'you must enter a phone number in order to complete your order.']
  },
  payment: {
    type: String,
    required: [true, 'you must enter a payment method in order to complete your order.']
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      productName: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0
  },
  totalProducts: {
    type: Number,
    required: true,
    default: 0
  }
});

const Orders = mongoose.model('orders', ordersSchema);

module.exports = Orders;
