const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'A new item in the shop must have his picture!']
  },
  productName: {
    type: String,
    required: [true, 'A new item in the shop must have product name!']
  },
  description: {
    type: String,
    required: [true, 'A new item in the shop must have description!']
  },
  price: {
    type: String,
    required: [true, 'A new item in the shop must have price!']
  }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
