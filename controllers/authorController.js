const Author = require('../models/author');
const Book = require('../models/book');
const mongoose = require('mongoose');

// Get all authors
exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single author
exports.getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid author ID format' });
    }
    
    const author = await Author.findById(id);
    
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new author
exports.createAuthor = async (req, res) => {
  try {
    const { firstName, lastName, biography, birthDate, nationality } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName || !biography || !birthDate || !nationality) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Validate birth date
    const birthDateObj = new Date(birthDate);
    if (isNaN(birthDateObj.getTime())) {
      return res.status(400).json({ message: 'Invalid birth date format' });
    }
    
    const author = new Author(req.body);
    const savedAuthor = await author.save();
    
    res.status(201).json(savedAuthor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an author
exports.updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid author ID format' });
    }
    
    // Check if author exists
    const author = await Author.findById(id);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    
    // Validate birth date if provided
    if (req.body.birthDate) {
      const birthDateObj = new Date(req.body.birthDate);
      if (isNaN(birthDateObj.getTime())) {
        return res.status(400).json({ message: 'Invalid birth date format' });
      }
    }
    
    const updatedAuthor = await Author.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    
    res.status(200).json(updatedAuthor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an author
exports.deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid author ID format' });
    }
    
    // Check if author has books
    const books = await Book.find({ author: id });
    if (books.length > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete author with associated books. Delete the books first or reassign them to another author.' 
      });
    }
    
    const author = await Author.findByIdAndDelete(id);
    
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    
    res.status(200).json({ message: 'Author deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
