const Book = require('../models/Book');

/**
 * Books Controller - Coffee BOOK
 * Handles all book-related operations
 * Books are for in-cafe reading only - not for sale
 */

// ==================== GET ALL BOOKS ====================
const getAllBooks = async (req, res) => {
  try {
    const { genre, featured, limit = 50, sort = 'title' } = req.query;
    
    let query = {};
    
    // Filter by genre
    if (genre && genre !== 'all') {
      query.genre = genre;
    }
    
    // Filter featured books
    if (featured === 'true') {
      query.isFeatured = true;
    }
    
    let books = Book.find(query);
    
    // Sorting
    if (sort === 'rating_desc') books = books.sort({ rating: -1 });
    else if (sort === 'year_desc') books = books.sort({ year: -1 });
    else if (sort === 'year_asc') books = books.sort({ year: 1 });
    else books = books.sort({ title: 1 });
    
    books = books.limit(parseInt(limit));
    
    const allBooks = await books;
    
    res.status(200).json({
      success: true,
      count: allBooks.length,
      data: allBooks,
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== GET SINGLE BOOK ====================
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const book = await Book.findById(id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== GET BOOKS BY GENRE ====================
const getBooksByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const { limit = 50 } = req.query;
    
    const validGenres = ['fiction', 'nonfiction', 'youngadults', 'children', 'urdu', 'poetry', 'classics', 'romance', 'horror'];
    
    if (!validGenres.includes(genre)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid genre',
      });
    }
    
    const books = await Book.find({ genre })
      .sort({ rating: -1 })
      .limit(parseInt(limit));
    
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error('Error fetching books by genre:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== GET BESTSELLERS (Highest Rated) ====================
const getBestsellers = async (req, res) => {
  try {
    const { limit = 6 } = req.query;
    
    const bestsellers = await Book.find({ rating: { $gt: 4.5 } })
      .sort({ rating: -1 })
      .limit(parseInt(limit));
    
    res.status(200).json({
      success: true,
      count: bestsellers.length,
      data: bestsellers,
    });
  } catch (error) {
    console.error('Error fetching bestsellers:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== GET FEATURED BOOKS ====================
const getFeaturedBooks = async (req, res) => {
  try {
    const { limit = 6 } = req.query;
    
    const featured = await Book.find({ isFeatured: true })
      .sort({ rating: -1 })
      .limit(parseInt(limit));
    
    res.status(200).json({
      success: true,
      count: featured.length,
      data: featured,
    });
  } catch (error) {
    console.error('Error fetching featured books:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== GET BOOKS BY LANGUAGE ====================
const getBooksByLanguage = async (req, res) => {
  try {
    const { language } = req.params;
    const { limit = 50 } = req.query;
    
    const books = await Book.find({ language })
      .sort({ title: 1 })
      .limit(parseInt(limit));
    
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error('Error fetching books by language:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== SEARCH BOOKS ====================
const searchBooks = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      });
    }
    
    const results = await Book.find(
      { $text: { $search: q } },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .limit(20);
    
    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error('Error searching books:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== GET RANDOM BOOK RECOMMENDATION ====================
const getRandomRecommendation = async (req, res) => {
  try {
    const randomBook = await Book.aggregate([
      { $match: { rating: { $gt: 4 } } },
      { $sample: { size: 1 } }
    ]);
    
    if (randomBook.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No recommendations found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: randomBook[0],
    });
  } catch (error) {
    console.error('Error fetching random recommendation:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== CREATE BOOK (Admin Only - Future) ====================
const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    
    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.error('Error creating book:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: messages,
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== UPDATE BOOK (Admin Only - Future) ====================
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    
    const book = await Book.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== DELETE BOOK (Admin Only - Future) ====================
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    
    const book = await Book.findByIdAndDelete(id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== TOGGLE FEATURED STATUS ====================
const toggleFeatured = async (req, res) => {
  try {
    const { id } = req.params;
    
    const book = await Book.findById(id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
    
    book.isFeatured = !book.isFeatured;
    await book.save();
    
    res.status(200).json({
      success: true,
      data: book,
      message: `Book ${book.isFeatured ? 'featured' : 'unfeatured'}`,
    });
  } catch (error) {
    console.error('Error toggling featured:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  getBooksByGenre,
  getBestsellers,
  getFeaturedBooks,
  getBooksByLanguage,
  searchBooks,
  getRandomRecommendation,
  createBook,
  updateBook,
  deleteBook,
  toggleFeatured,
};