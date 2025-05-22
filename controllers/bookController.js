const Book = require('../models/book');
const mongoose = require('mongoose');

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('author', 'firstName lastName');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single book
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid book ID format' });
    }
    
    const book = await Book.findById(id).populate('author');
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, isbn, publishYear, genre, description, pageCount, language, publisher } = req.body;
    
    // Validate required fields
    if (!title || !author || !isbn || !publishYear || !genre || !description || !pageCount || !language || !publisher) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Validate author ID format
    if (!mongoose.Types.ObjectId.isValid(author)) {
      return res.status(400).json({ message: 'Invalid author ID format' });
    }
    
    // Check if ISBN already exists
    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      return res.status(400).json({ message: 'A book with this ISBN already exists' });
    }
    
    const book = new Book(req.body);
    const savedBook = await book.save();
    
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid book ID format' });
    }
    
    // Check if book exists
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    // If updating ISBN, check if it already exists
    if (req.body.isbn && req.body.isbn !== book.isbn) {
      const existingBook = await Book.findOne({ isbn: req.body.isbn });
      if (existingBook) {
        return res.status(400).json({ message: 'A book with this ISBN already exists' });
      }
    }
    
    // If updating author, validate author ID format
    if (req.body.author && !mongoose.Types.ObjectId.isValid(req.body.author)) {
      return res.status(400).json({ message: 'Invalid author ID format' });
    }
    
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid book ID format' });
    }
    
    const book = await Book.findByIdAndDelete(id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
