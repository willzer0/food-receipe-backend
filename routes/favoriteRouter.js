const express = require("express");
const favoriteController = require("../controllers/favoriteController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Toggle favorite (add/remove)
router.post(
  "/foods/:foodId/favorite",
  protect,
  favoriteController.toggleFavorite
);

// List all favorites of logged-in user
router.get("/favorites", protect, favoriteController.getFavorites);

// Remove specific favorite
router.delete("/favorites/:foodId", protect, favoriteController.removeFavorite);

// Count favorites for a food (opsional: tidak perlu auth)
router.get("/foods/:foodId/favorites-count", favoriteController.countFavorites);

module.exports = router;
