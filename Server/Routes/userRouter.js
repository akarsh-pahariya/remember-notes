const authController = require('../Controllers/authController');
const {
  getUSerById,
  createUser,
  authenticationResponse,
  updateUser,
  uploadUserPhoto,
  resizeUserPhoto,
} = require('../Controllers/userController');
const express = require('express');

const Router = express.Router();

Router.route('/authenticate').get(
  authController.authenticateUser,
  authenticationResponse
);

Router.route('/forgotPassword').post(authController.forgotPassword);
Router.route('/resetPassword').post(authController.resetPassword);

Router.route('/logout').get(authController.logout);

Router.route('/').post(createUser);

Router.route('/:id').get(getUSerById);

Router.route('/login').post(authController.login);

Router.route('/update').post(
  authController.authenticateUser,
  uploadUserPhoto,
  resizeUserPhoto,
  updateUser
);

module.exports = Router;
