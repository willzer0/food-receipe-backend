const express = require("express");
const app = express();
const morgan = require("morgan");

const foodRouter = require("./routes/foodRouter");

const userRouter = require("./routes/userRouter");

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
// app.use(express.static(`${__dirname}/public`));

app.use("/api/v1/foods", foodRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
