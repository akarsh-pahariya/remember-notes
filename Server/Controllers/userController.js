const multer = require('multer');
const sharp = require('sharp');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const { createToken } = require('./authController');
const { globalErrorHandler } = require('./errorController');
const { Email } = require('../Utils/email');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'Public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else {
    const err = new Error('Not an image! Please upload only images');
    err.statusCode = 400;
    cb(err, false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

const uploadUserPhoto = upload.single('photo');

const resizeUserPhoto = async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`Public/img/users/${req.file.filename}`);
  next();
};

const createUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    const url = `${process.env.FRONTEND_URL}/user`;
    await new Email(newUser, url).sendWelcome();

    const token = createToken(newUser._id);

    res.cookie('authToken', token, {
      httpOnly: true,
      path: '/',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 90),
    });
    const user = newUser.toObject();
    delete user.password;

    return res.status(200).json({
      status: 'Success',
      message: 'You have logged in successfully',
      user,
    });
  } catch (err) {
    err.statusCode = 500;
    globalErrorHandler(err, req, res);
  }
};

const authenticationResponse = (req, res) => {
  res.status(200).json({
    user: res.locals.user,
    status: 'success',
  });
};

const getUSerById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    res.status(200).json({
      status: 'success',
      data: {
        user: user,
      },
    });
  } catch (err) {
    err.statusCode = 500;
    globalErrorHandler(err, req, res);
  }
};

const updateUser = async (req, res, next) => {
  try {
    if (req.file) req.body.photo = `img/users/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      runValidators: true,
      new: true,
    });

    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (err) {
    err.statusCode = 500;
    globalErrorHandler(err, req, res);
  }
};

module.exports = {
  getUSerById,
  createUser,
  authenticationResponse,
  updateUser,
  uploadUserPhoto,
  resizeUserPhoto,
};
