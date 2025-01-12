const { query } = require('express');
const Note = require('../Models/noteModel');
const AppError = require('../Utils/appError');
const { globalErrorHandler } = require('./errorController');

const getNote = async (req, res) => {
  try {
    let notesQuery = Note.find({ user: req.user._id }).select('-__v -user');
    const notes = await notesQuery;

    res.status(201).json({
      status: 'Success',
      result: notes.length,
      user: res.locals.user || 0,
      data: {
        note: notes,
      },
    });
  } catch (err) {
    err.statusCode = 401;
    globalErrorHandler(err, req, res);
  }
};

const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });

    res.status(201).json({
      status: 'Success',
      data: {
        note: note,
      },
    });
  } catch (err) {
    err.statusCode = 401;
    globalErrorHandler(err, req, res);
  }
};

const createNote = async (req, res) => {
  try {
    req.body.user = req.user._id;
    const newNote = await Note.create(req.body);

    res.status(201).json({
      status: 'Success',
      data: {
        note: newNote,
      },
    });
  } catch (err) {
    err.statusCode = 400;
    globalErrorHandler(err, req, res);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

    if (note === null)
      return next(
        new AppError(
          'No document found in the database with given ID and user ID',
          401
        )
      );

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    res.status(201).json({
      status: 'Success',
      data: {
        note: updatedNote,
      },
    });
  } catch (err) {
    err.statusCode = 401;
    globalErrorHandler(err, req, res);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

    if (note === null)
      return next(
        new AppError(
          'No document found in the database with given ID and user ID',
          401
        )
      );

    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    res.status(201).json({
      status: 'Success',
      data: {
        note: deletedNote,
      },
    });
  } catch (err) {
    err.statusCode = 401;
    globalErrorHandler(err, req, res);
  }
};

module.exports = { getNote, getNoteById, createNote, updateNote, deleteNote };
