const express = require('express');
const morgan = require('morgan');

const shopRouter = require('./routes/shopRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api/items', shopRouter);
app.use('/api/users', userRouter);

module.exports = app;
