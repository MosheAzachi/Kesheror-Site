const Contact = require('../models/contactModel');

exports.createContact = async (req, res) => {
  console.log('hi');
  try {
    const newItem = await Contact.create(req.body);
    res.status(201).json({
      status: 'success',
      item: newItem
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};
