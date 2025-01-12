const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title of the note is required'],
      minLength: [
        3,
        'Note Title should be longer than or equal to 3 characters',
      ],
      maxLength: [
        100,
        'Note Title should be longer than or equal to 100 characters',
      ],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Description of the note is required'],
      minLength: [
        5,
        'Note Description should be longer than or equal to 5 characters',
      ],
      maxLength: [
        1000,
        'Note Description should be longer than or equal to 1000 characters',
      ],
    },
    importance: {
      type: Number,
      min: [1, 'Minimum importance of a note cannot be less than 1'],
      max: [10, 'Maximum importance of a note cannot be greater than 10'],
      default: 5,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
