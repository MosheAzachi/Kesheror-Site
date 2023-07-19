const Cart = require('../models/cartModel');

exports.addOrder = async (req, res) => {
  try {
    const { userId, } = req.body;
    const cart = await Cart.findById(userId);
    if (!cart) {
      return res.status(404).json({ message: 'Item not found' });
    } else {
      const
    }

  }