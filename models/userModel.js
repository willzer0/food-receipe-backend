const mongoose = require('mongoose');
////////////////////////////////
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A user must have a name'],
    },
    email: {
      type: String,
      required: [true, 'A user must have an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'A user must have a password'],
      minlength: 8,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
      },
    ],
  },
  {
    timestamps: true,
  },
);
///////////////////////////////
const User = mongoose.model('User', userSchema);

module.exports = User;
