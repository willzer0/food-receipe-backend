const express = require('express');
const foodController = require('../controllers/foodController');

const router = express.Router();

router
  .route('/top-10-fastest-recipes')
  .get(foodController.getTop10FastestCookingTimes);

router
  .route('/')
  .get(foodController.getAllFoods)
  .post(foodController.createFood);
router
  .route('/:id')
  .get(foodController.getFood)
  .patch(foodController.updateFood)
  .delete(foodController.deleteFood);

module.exports = router;
