const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
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
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    photo: string,
    password: {
      type: String,
      required: [true, 'A user must have a password'],
      minlength: 8,
      validate: {
        validator: function (el) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            el,
          );
        },
        message:
          'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
      },
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!',
      },
    },
  },
  {
    timestamps: true,
  },
);
////////////////////////////////
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
///////////////////////////////
const User = mongoose.model('User', userSchema);

module.exports = User;
