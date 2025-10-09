const express = require('express');
const app = express();
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const csurf = require('csurf');
////////////////////////////////
const foodRouter = require('./routes/foodRouter');
const userRouter = require('./routes/userRouter');
// const favoriteRouter = require("./routes/favoriteRouter");
const errorHandler = require('./controllers/errorController');
const appError = require('./utils/appError');
//////////////////////////////////
const whiteList = [
  'duration',
  'ratingsQuantity',
  'ratingsAverage',
  'maxGroupSize',
  'difficulty',
  'price',
];
///////////////////////////////
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
////////////////////////////////
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
const loginLimiter = rateLimit({
  max: 5,
  windowMs: 60 * 60 * 1000,
  message: 'Too many login attempts from this IP, please try again in an hour!',
});
app.use('/api', limiter);
app.use('/api/v1/users/login', loginLimiter);
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(
  hpp({
    whiteList,
  })
);
app.use(csurf());
////////////////////////////////
app.use(express.json({ limit: '10kb' }));
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log('dibawah adalah req header', req.headers);
  next();
});
////////////////////////////////
app.use('/api/v1/foods', foodRouter);
app.use('/api/v1/users', userRouter);
// app.use("/api/v1", favoriteRouter);
////////////////////////////////
app.all('/*splat', (req, res, next) => {
  next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorHandler);

module.exports = app;
