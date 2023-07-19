const Item = require('../models/itemModel');
const Cart = require('../models/cartModel');

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const item = await Item.findById(productId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const price = item.price; // Retrieve the price from the item
    const productName = item.productName;
    const productImage = item.image;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [], totalPrice: 0 });
    }

    const existingItem = cart.items.find(item => item.productId.equals(productId));

    cart.totalProducts += quantity;

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, productName, productImage, quantity, price }); // Add the price to the cart item
    }

    // Calculate the total price
    cart.totalPrice = cart.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    await Cart.create(cart);

    const cartData = JSON.stringify(cart);
    res.cookie('cart', cartData);

    res.status(200).json({
      status: 'success'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteMyCart = async (req, res) => {
  const userId = req.params.id;
  const cart = await Cart.findOne({ userId });
  if (cart) {
    await Cart.findByIdAndDelete(cart._id);
  }
};

exports.deleteOneCartItem = async (req, res) => {
  const userId = req.params.id;
  const productId = req.body.productId;

  let cart = await Cart.findOne({ userId });

  const existingItem = cart.items.find(item => item.productId.equals(productId));
  const price = existingItem.price * existingItem.quantity;
  const quantity = existingItem.quantity;

  const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
  cart.items.splice(itemIndex, 1);
  cart.totalPrice -= price;
  cart.totalProducts -= quantity;

  if (cart.totalProducts === 0) {
    await Cart.findByIdAndDelete(cart._id);
  } else {
    await cart.save();
  }
  const cartData = JSON.stringify(cart);
  res.cookie('cart', cartData);

  res.status(200).json({
    status: 'success'
  });
};
