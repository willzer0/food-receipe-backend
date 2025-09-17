const favorite = require("../models/favoriteModel");
const food = require("../models/foodModel");

exports.toggleFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { foodId } = req.params;

    // Pastikan food ada
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).json({
        status: "fail",
        message: "Food not found",
      });
    }

    const existing = await Favorite.findOne({ user: userId, food: foodId });

    if (existing) {
      await existing.deleteOne();
      return res.status(200).json({
        status: "success",
        message: "Removed from favorites",
        data: { favorited: false },
      });
    }

    const favorite = await Favorite.create({ user: userId, food: foodId });
    return res.status(201).json({
      status: "success",
      message: "Added to favorites",
      data: { favorited: true, favorite },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Get all favorites of logged-in user
exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    const favorites = await Favorite.find({ user: userId })
      .populate("food", "title category cookingTime")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      results: favorites.length,
      data: { favorites },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Remove specific favorite
exports.removeFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { foodId } = req.params;

    const favorite = await Favorite.findOneAndDelete({
      user: userId,
      food: foodId,
    });

    if (!favorite) {
      return res.status(404).json({
        status: "fail",
        message: "Favorite not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Favorite removed",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Count how many users favorited a food
exports.countFavorites = async (req, res) => {
  try {
    const { foodId } = req.params;
    const count = await Favorite.countDocuments({ food: foodId });

    res.status(200).json({
      status: "success",
      data: { foodId, favoritesCount: count },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
