const CartItem = require('../models/cartModel');
const Orders  = require('../models/ordersModel');

exports.createOrder = async (req, res) => {
  try {
    const newOrder = await Orders.create({
      orderID : generateOrderID(),
      userID : req.cookie.email,
      address: req.body.address,
      phone : req.body.phone,
      items : await CartItem.findById(req.userID)
    });
    res.status(201).json({
      status: 'success',
      order : newOrder
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};


