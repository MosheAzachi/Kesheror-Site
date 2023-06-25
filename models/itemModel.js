const mognoose = require('mongoose');

const itemSchema = new mognoose.Schema({
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
  sale: {
    type: Boolean,
    default: false,
  },
  salePrecentOff: {
    type: String,
    default: 0,
    validate: {
      validator: function (val) {
        if (this.sale === true) {
          return val > 0;
        }
      },
      message: 'Enter sale%',
    },
  },
});

const Item = mognoose.model('Item', itemSchema);

module.exports = Item;
