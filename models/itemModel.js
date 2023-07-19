const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'A new item in the shop must have its picture!']
  },
  productName: {
    type: String,
    required: [true, 'A new item in the shop must have a product name!']
  },
  description: {
    type: String,
    required: [true, 'A new item in the shop must have a description!']
  },
  price: {
    type: Number,
    required: [true, 'A new item in the shop must have a price!']
  },
  sale: {
    type: Boolean,
    required: [true, 'Specify if the item is on sale or not'],
    default: false
  },
  priceAfterSale: {
    type: Number,
    default: 0,
    validate: {
      validator: function(val) {
        if (this.sale === true) {
          return val > 0;
        }
      },
      message: 'Enter price after sale'
    }
  }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
