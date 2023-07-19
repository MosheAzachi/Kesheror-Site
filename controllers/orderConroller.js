const Cart = require('../models/cartModel');
const Order = require('../models/ordersModel');
const User = require('../models/userModel');

exports.addOrder = async (req, res) => {
  try {
    const { userId, address, phone, payment } = req.body;
    const cart = await Cart.findById(userId);
    if (!cart) {
      return res.status(404).json({ message: 'cart not found' });
    } else {
      const order = await Order.create(address, phone, payment, cart);
      res.status(200).json({
        message: 'success',
        data: order
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new AppError('No user found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        order: order,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

