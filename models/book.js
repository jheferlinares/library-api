const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: [true, 'Author is required']
  },
  isbn: {
    type: String,
    required: [true, 'ISBN is required'],
    unique: true,
    trim: true
  },
  publishYear: {
    type: Number,
    required: [true, 'Publish year is required']
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  pageCount: {
    type: Number,
    required: [true, 'Page count is required']
  },
  language: {
    type: String,
    required: [true, 'Language is required'],
    trim: true
  },
  publisher: {
    type: String,
    required: [true, 'Publisher is required'],
    trim: true
  },
  available: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
