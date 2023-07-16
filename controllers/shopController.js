const Product = require('../models/productModel');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAllItems = async (req, res) => {
  try {
    const features = new APIFeatures(Product.find(), req.query).filter().sort();
    const items = await features.query;
    res.status(200).json({
      status: 'success',
      results: items.length,
      data: {
        items: items,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getItem = async (req, res) => {
  try {
    const item = await Product.findById(req.params.id);
    if (!item) {
      return next(new AppError('No item found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        item: item,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createItem = async (req, res) => {
  try {
    const newItem = await Product.create(req.body);
    res.status(201).json({
      status: 'success',
      item: newItem,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const newItem = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        item: newItem,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
