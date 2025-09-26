const express = require('express');
const app = express();
const morgan = require('morgan');
////////////////////////////////
const foodRouter = require('./routes/foodRouter');
const userRouter = require('./routes/userRouter');
// const favoriteRouter = require("./routes/favoriteRouter");
const errorHandler = require('./controllers/errorController');
const appError = require('./utils/appError');
//////////////////////////////////
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
////////////////////////////////
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
////////////////////////////////
app.use('/api/v1/foods', foodRouter);
app.use('/api/v1/users', userRouter);
// app.use("/api/v1", favoriteRouter);
////////////////////////////////
app.all('*', (req, res, next) => {
  next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorHandler);

module.exports = app;
