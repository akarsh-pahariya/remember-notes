const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../Models/userModel');
const AppError = require('../Utils/appError');
const { Email } = require('../Utils/email');

const createToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const authenticateUser = async (req, res, next) => {
  let token;

  if (req.cookies.authToken) token = req.cookies.authToken;

  if (!token)
    return next(
      new AppError('You are not logged in! Please login to get access.', 401)
    );

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id).select('-password');

  if (!currentUser)
    return next(
      new AppError(
        'The user belonging to this token does no longer exists',
        401
      )
    );

  if (currentUser.changedPasswordAfter(decoded.iat))
    return next(
      new AppError('User recenlty changed password! Please login again', 401)
    );

  if (req.headers.userinforequired === 'true') res.locals.user = currentUser;

  req.user = currentUser;
  next();
};

const login = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password)
      return next(new AppError('Please provide email or password', 401));

    const userDoc = await User.findOne({ email: req.body.email });

    if (!userDoc)
      return next(
        new AppError('No user exists with the provided email address', 401)
      );

    const result = await userDoc.checkPassword(
      userDoc.password,
      req.body.password
    );

    if (result) {
      const token = createToken(userDoc.id);

      res.cookie('authToken', token, {
        httpOnly: true,
        path: '/',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 90),
      });
      const user = userDoc.toObject();
      delete user.password;

      return res.status(200).json({
        status: 'Success',
        message: 'You have logged in successfully',
        user,
      });
    }

    return next(
      new AppError('Wrong password for the provided email address', 401)
    );
  } catch (err) {
    return next(new AppError('Something went wrong !!', 500));
  }
};

const logout = async (req, res, next) => {
  res.clearCookie('authToken', {
    httpOnly: true,
    path: '/',
  });
  res
    .status(200)
    .json({ status: 'Success', message: 'Successfully Logged out !!' });
};

const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return next(
        new AppError('No user found with the provided email address', 404)
      );

    const passwordResetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    try {
      const resetURL = `http://localhost:5173/reset-password/${passwordResetToken}`;
      await new Email(user, resetURL).sendPasswordReset();

      res.status(200).send({
        status: 'Success',
        message: 'Password change email has been sent to your email address',
      });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return next(
        new AppError(
          'There is an error occured while sending email, Please try again later !!',
          500
        )
      );
    }
  } catch (error) {
    return next(new AppError('Something went wrong !!', 500));
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.body.passwordResetToken)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user)
      return next(new AppError('Token is invalid or has expired', 400));

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.passwordChangedAt = Date.now();
    await user.save();

    res.status(200).send({
      status: 'Success',
      message:
        'Your password has been updated successfully !! Try logging in with the updated password',
    });
  } catch (error) {
    return next(new AppError('Something went wrong !!', 500));
  }
};

module.exports = {
  createToken,
  login,
  authenticateUser,
  logout,
  forgotPassword,
  resetPassword,
};
