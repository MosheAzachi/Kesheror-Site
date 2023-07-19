const mognoose = require('mongoose');

const itemSchema = new mognoose.Schema({
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

const Item = mognoose.model('Item', itemSchema);

module.exports = Item;
