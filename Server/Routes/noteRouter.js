const express = require('express');
const noteController = require('../Controllers/noteController');
const authController = require('../Controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.authenticateUser, noteController.getNote)
  .post(authController.authenticateUser, noteController.createNote);

router
  .route('/:id')
  .get(authController.authenticateUser, noteController.getNoteById)
  .post(authController.authenticateUser, noteController.updateNote)
  .delete(authController.authenticateUser, noteController.deleteNote);

module.exports = router;
