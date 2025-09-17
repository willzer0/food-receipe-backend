const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      String,
      type: String,
      maxlength: [
        500,
        "Description must be less than or equal to 500 characters",
      ],
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    steps: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Sarapan", "Makan Siang", "Makan Malam", "Dessert"],
      required: true,
    },
    cookingTime: {
      type: Number, // dalam menit
      required: true,
      min: [1, "Cooking time must be at least 1 minute"],
      max: [300, "Cooking time must be at most 300 minutes"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
