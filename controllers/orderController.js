const Cart = require('../models/cartModel');
const Order = require('../models/ordersModel');

exports.addOrder = async (req, res) => {
  try {
    const { userId,fullName, address, phone, payment } = req.body;
    console.log(fullName);
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'cart not found' });
    } else {
      const items = cart.items;
      const totalPrice = cart.totalPrice;
      const totalProducts = cart.totalProducts;
      const order = await Order.create({ userId,fullName, address, phone,payment, items, totalPrice, totalProducts });
      await Cart.findByIdAndDelete(cart._id);
      res.cookie('cart', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
      });
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
    const userId = req.params.id;
    const order = await Order.findOne({ userId });
    if (!order) {
      return next(new AppError('No user found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        order: order
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
