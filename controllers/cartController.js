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
      console.log(userId);
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

    await cart.save();


    const cartData = JSON.stringify(cart);
    res.cookie('cart', cartData);

    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
