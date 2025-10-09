const mongoose = require('mongoose');
/////////////////////////////////
const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Title must be less than or equal to 100 characters'],
      unique: true,
    },
    description: {
      type: String,
      maxlength: [
        500,
        'Description must be less than or equal to 500 characters',
      ],
      required: true,
      trim: true,
    },
    ingredients: {
      type: String,
      required: true,
      trim: true,
      maxlength: [
        1000,
        'Ingredients must be less than or equal to 1000 characters',
      ],
      unique: true,
    },
    steps: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: [2000, 'Steps must be less than or equal to 2000 characters'],
    },
    category: {
      type: String,
      enum: ['Sarapan', 'Makan Siang', 'Makan Malam', 'Dessert'],
      required: true,
    },
    cookingTime: {
      type: Number, // dalam menit
      required: true,
      min: [1, 'Cooking time must be at least 1 minute'],
      max: [300, 'Cooking time must be at most 300 minutes'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
////////////////////////////////
// foodSchema.virtual('durationWeeks').get(function () {
//   return this.duration / 7;
// });

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
// tourSchema.pre('save', function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

// foodSchema.pre('save', function (next) {
//   console.log('Will save document...');
//   next();
// });

// foodSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
// foodSchema.pre(/^find/, function (next) {
//   this.find({ secretTour: { $ne: true } });
//   this.start = Date.now();
//   next();
// });

// foodSchema.post(/^find/, function (docs, next) {
//   console.log(`Query took ${Date.now() - this.start} milliseconds!`);
//   console.log(docs);
//   next();
// });
////////////////////////////////
foodSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
});
////////////////////////////////
const Food = mongoose.model('Food', foodSchema);
//////////////////////////////////
module.exports = Food;
