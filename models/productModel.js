const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'A new item in the shop must have his picture!'],
  },
  productName: {
    type: String,
    required: [true, 'A new item in the shop must have product name!'],
  },
  description: {
    type: String,
    required: [true, 'A new item in the shop must have description!'],
  },
  price: {
    type: String,
    required: [true, 'A new item in the shop must have price!'],
  },
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
