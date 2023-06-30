const Item = require('./../models/itemModel');

exports.getOverview = (req, res) => {
  res.status(200).render('home', {
    title: 'דף הבית',
    activePage: req.path,
  });
};

exports.getProfile = (req, res) => {
  res.status(200).render('profile', {
    title: 'פרופיל',
    activePage: req.path,
  });
};

exports.getGallery = (req, res) => {
  res.status(200).render('gallery', {
    title: 'גלריה',
    activePage: req.path,
  });
};

exports.getLogin = (req, res) => {
  res.status(200).render('login', {
    title: 'התחברות',
    activePage: req.path,
  });
};

exports.getForgotPassword = (req, res) => {
  res.status(200).render('forgotpassword', {
    title: 'שכחתי סיסמא',
    activePage: req.path,
  });
};

exports.getRegister = (req, res) => {
  res.status(200).render('register', {
    title: 'הרשמה',
    activePage: req.path,
  });
};

exports.getStore = async (req, res, next) => {
  try {
    const items = await Item.find();
    res.status(200).render('store', {
      title: 'חנות',
      items: items,
      activePage: req.path,
    });
  } catch (err) {}
};

exports.getContact = (req, res) => {
  res.status(200).render('contact', {
    title: 'צור קשר',
    activePage: req.path,
  });
};
