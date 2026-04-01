const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/booksController');

// ==================== PUBLIC ROUTES ====================
// These routes are accessible to everyone without authentication

// GET /api/books
// Fetch all books with optional filters (genre, featured, limit, sort)
router.get('/', getAllBooks);

// GET /api/books/featured
// Returns featured books for homepage (limit optional)
router.get('/featured', getFeaturedBooks);

// GET /api/books/bestsellers
// Returns highest rated books (4.5+ stars)
router.get('/bestsellers', getBestsellers);

// GET /api/books/recommendation
// Returns a random book suggestion (4+ stars)
router.get('/recommendation', getRandomRecommendation);

// GET /api/books/search?q=alchemist
// Text search across title, author, and description
router.get('/search', searchBooks);

// GET /api/books/genre/:genre
// Fetch books by specific genre (fiction, urdu, poetry, etc)
router.get('/genre/:genre', getBooksByGenre);

// GET /api/books/language/:language
// Fetch books by language (English, Urdu, Both)
router.get('/language/:language', getBooksByLanguage);

// GET /api/books/:id
// Fetch a single book by its MongoDB ID
router.get('/:id', getBookById);

// ==================== ADMIN ROUTES ====================
// These routes should be protected with authentication middleware in production
// They are kept separate for clarity and future authorization

// POST /api/books
// Create a new book (admin only)
router.post('/', createBook);

// PUT /api/books/:id
// Fully update an existing book (admin only)
router.put('/:id', updateBook);

// PATCH /api/books/:id/toggle-featured
// Toggle isFeatured status (admin only)
router.patch('/:id/toggle-featured', toggleFeatured);

// DELETE /api/books/:id
// Remove a book from the database (admin only)
router.delete('/:id', deleteBook);

module.exports = router;