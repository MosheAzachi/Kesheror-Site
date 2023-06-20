const Item = require('./../models/itemModel');

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json({
      Status: 'success',
      Results: items.length,
      Data: {
        Items: items,
      },
    });
  } catch (err) {
    res.status(404).json({
      Status: 'fail',
      Message: err,
    });
  }
};

exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.status(200).json({
      Status: 'success',
      Data: {
        Item: item,
      },
    });
  } catch (err) {
    res.status(404).json({
      Status: 'fail',
      Message: err,
    });
  }
};

exports.createItem = async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(201).json({
      Status: 'success',
      Item: newItem,
    });
  } catch (err) {
    res.status(400).json({
      Status: 'fail',
      Message: err,
    });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const newItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      Status: 'success',
      Data: {
        Item: newItem,
      },
    });
  } catch (err) {
    res.status(400).json({
      Status: 'fail',
      Message: err,
    });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(204).json({
      Status: 'success',
      Data: null,
    });
  } catch (err) {
    res.status(404).json({
      Status: 'fail',
      Message: err,
    });
  }
};
