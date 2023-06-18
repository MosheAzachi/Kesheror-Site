const fs = require('fs');

const items = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/items.json`));

exports.checkID = (req, res, next, val) => {
  console.log(`Item id is: ${val}`);

  if (req.params.id * 1 > items.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.productName || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing product name or price',
    });
  }
  next();
};

exports.getAllItems = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: items.length,
    data: {
      items,
    },
  });
};

exports.getItem = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  const item = items.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      item,
    },
  });
};

exports.createItem = (req, res) => {
  const newId = items[items.length - 1].id + 1;
  const newItem = Object.assign({ id: newId }, req.body);

  items.push(newItem);

  fs.writeFile(`${__dirname}/dev-data/data.json`, JSON.stringify(items), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        item: newItem,
      },
    });
  });
};

exports.updateItem = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      item: '<Updated item here...>',
    },
  });
};

exports.deleteItem = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
