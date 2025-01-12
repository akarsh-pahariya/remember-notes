const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { type } = require('os');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: 'String',
      required: [true, 'Please provide your name'],
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: 'String',
      unique: true,
      lowercase: true,
      required: [true, 'Please provide your email'],
      validate: [validator.isEmail, 'Please enter a valid email address'],
    },
    password: {
      type: 'String',
      required: [true, 'Please provide your password'],
      minLength: 8,
      maxLength: 128,
    },
    confirmPassword: {
      type: 'String',
      required: [true, 'Confirm Password is a required field'],
      validate: {
        validator: function (confirmPassword) {
          return this.password === confirmPassword;
        },
        message: 'Password and Confirm password do not match',
      },
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    passwordChangedAt: Date,
    photo: {
      type: String,
      default: 'img/users/default.png',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTime = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return changedTime > JWTTimestamp;
  }

  return false;
};

userSchema.methods.checkPassword = async function (
  hashedPassword,
  candidatePassword
) {
  const result = await bcrypt.compare(candidatePassword, hashedPassword);
  return result;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
