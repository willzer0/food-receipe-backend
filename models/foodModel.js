const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    ingredients: [String],
    steps: [String],
    category: {
      type: String,
      enum: ["Sarapan", "Makan Siang", "Makan Malam", "Dessert"],
      required: true,
    },
    cookingTime: {
      type: Number, // dalam menit
      required: true,
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
