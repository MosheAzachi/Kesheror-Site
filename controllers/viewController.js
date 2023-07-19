const Item = require('./../models/itemModel');
const User = require('./../models/userModel');
const Order = require('./../models/ordersModel');
const Contact = require('./../models/contactModel');

exports.getOverview = (req, res) => {
  res.status(200).render('home', {
    title: 'דף הבית',
    activePage: req.path
  });
};

exports.getProfile = (req, res) => {
  res.status(200).render('profile', {
    title: 'פרופיל',
    activePage: req.path
  });
};

exports.getGallery = (req, res) => {
  res.status(200).render('gallery', {
    title: 'גלריה',
    activePage: req.path
  });
};

exports.getLogin = (req, res) => {
  res.status(200).render('login', {
    title: 'התחברות',
    activePage: req.path
  });
};

exports.getForgotPassword = (req, res) => {
  res.status(200).render('forgotpassword', {
    title: 'שכחתי סיסמא',
    activePage: req.path
  });
};

exports.getRegister = (req, res) => {
  res.status(200).render('register', {
    title: 'הרשמה',
    activePage: req.path
  });
};

exports.getStore = async (req, res, next) => {
  const items = await Item.find();
  res.status(200).render('store', {
    title: 'חנות',
    items: items,
    activePage: req.path
  });
};

exports.getContact = (req, res) => {
  res.status(200).render('contact', {
    title: 'צור קשר',
    activePage: req.path
  });
};

exports.getPersonal = (req, res) => {
  res.status(200).render('personal', {
    title: 'אזור אישי',
    activePage: req.path
  });
};

exports.createNewItem = (req, res) => {
  res.status(200).render('item', {
    title: 'יצירת מוצר',
    activePage: req.path
  });
};

exports.createNewUser = (req, res) => {
  res.status(200).render('user', {
    title: 'יצירת משתמש',
    activePage: req.path
  });
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).render('users', {
    title: 'משתמשים',
    users: users,
    activePage: req.path
  });
};

exports.getAllItems = async (req, res) => {
  const items = await Item.find();
  res.status(200).render('items', {
    title: 'מוצרים',
    items: items,
    activePage: req.path
  });
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find();
  res.status(200).render('orders', {
    title: 'הזמנות',
    orders: orders,
    activePage: req.path
  });
};

exports.getPayments = (req, res) => {
  res.status(200).render('payments', {
    title: 'הזמנה',
    activePage: req.path
  });
};

exports.getContacts = async (req, res) => {
  const contact = await Contact.find();
  res.status(200).render('contact-forms', {
    title: 'טפסי יצירת קשר',
    contact: contact,
    activePage: req.path
  });
};
