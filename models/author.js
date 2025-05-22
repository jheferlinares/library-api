const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  biography: {
    type: String,
    required: [true, 'Biography is required']
  },
  birthDate: {
    type: Date,
    required: [true, 'Birth date is required']
  },
  nationality: {
    type: String,
    required: [true, 'Nationality is required'],
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Author', authorSchema);
