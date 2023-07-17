const CartItem = require('../models/cartModel');
const Orders  = require('../models/ordersModel');
const User = require('../models/userModel');

exports.createOrder = async (req, res) => {
  try {
    const order = await Orders.findById(req.params.id);
    if (!order) {
      return next(new AppError('No user found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        order: order,
      },
    });
  }
 catch (err) {
  res.status(400).json({
    status: 'fail',
    message: err.message,
  });
}

};

exports.getOrder = async (req, res) => {
  try {
    const order = await Orders.findById(req.params.id);
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


