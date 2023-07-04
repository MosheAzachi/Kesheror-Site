const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const viewRouter = require('./routes/viewRoutes');
const shopRouter = require('./routes/shopRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cookieParser());

app.use('/', viewRouter);
app.use('/api/items', shopRouter);
app.use('/api/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
