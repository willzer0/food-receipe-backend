const Food = require('../models/foodModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
//////////////////////////////////
exports.getAllFoods = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Food.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const foods = await features.query;
  res.status(200).json({
    status: 'success',
    results: foods.length,
    requestTime: req.requestTime,
    data: {
      foods,
    },
  });
});
//////////////////////////////////
exports.createFood = catchAsync(async (req, res, next) => {
  const newFood = await Food.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      food: newFood,
    },
  });
});
///////////////////////////////////
exports.getFood = catchAsync(async (req, res, next) => {
  const food = await Food.findById(req.params.id);
  if (!food) {
    return next(new AppError('No food found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      food,
    },
  });
});
////////////////////////////////////
exports.updateFood = catchAsync(async (req, res, next) => {
  const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!food) {
    return next(new AppError('No food found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      food,
    },
  });
});
//////////////////////////////////
exports.deleteFood = catchAsync(async (req, res, next) => {
  await Food.findByIdAndDelete(req.params.id);
  if (!food) {
    return next(new AppError('No food found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
///////////////////////////////////
exports.getTop10FastestCookingTimes = catchAsync(async (req, res, next) => {
  const fastestFoods = await Food.find().sort({ cookingTime: 1 }).limit(10);
  res.status(200).json({
    status: 'success',
    results: fastestFoods.length,
    data: {
      foods: fastestFoods,
    },
  });
});
///////////////////////////////////
exports.getLatestFoods = catchAsync(async (req, res, next) => {
  const latestFoods = await Food.aggregate([
    {
      $sort: { createdAt: -1 },
    },
    {
      $limit: 5,
    },
  ]);

  res.status(200).json({
    status: 'success',
    results: latestFoods.length,
    data: {
      foods: latestFoods,
    },
  });
});
