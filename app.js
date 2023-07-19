const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const viewRouter = require('./routes/viewRoutes');
const shopRouter = require('./routes/shopRoutes');
const userRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoute');

const app = express();

app.engine('ejs', require('express-ejs-extend'));
app.set('view engine', 'ejs');
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
app.use('/api/cart', cartRouter);


app.all('*', (req, res, next) => {
  res.status(200).render('notFound', {
    title: 'עמוד לא נמצא',
    activePage: req.path
  });
});

app.use(globalErrorHandler);

module.exports = app;
