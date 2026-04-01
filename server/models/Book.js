const mongoose = require('mongoose');

/**
 * Book Schema - Coffee BOOK
 * Stores books available for reading in the cafe
 * Books are for in-cafe reading only - not for sale or borrowing
 * 
 * Features:
 * - Categories for easy browsing
 * - Ratings for recommendations
 * - Inspirational quotes from each book
 * - Beautiful covers for display
 */

const bookSchema = new mongoose.Schema(
  {
    // ==================== BASIC INFORMATION ====================
    title: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
      index: true,
    },

    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
      maxlength: [100, 'Author name cannot exceed 100 characters'],
      index: true,
    },

    // ==================== CATEGORIES ====================
    genre: {
      type: String,
      required: [true, 'Genre is required'],
      enum: ['fiction', 'nonfiction', 'youngadults', 'children', 'urdu', 'poetry', 'classics', 'romance', 'horror'],
      default: 'fiction',
      index: true,
      comment: 'Main genre for filtering',
    },

    // Sub-genre for more specific categorization
    subGenre: {
      type: String,
      default: '',
      comment: 'e.g., "Literary Fiction", "Science Fiction", "Self-Help"',
    },

    // ==================== RATINGS & RECOMMENDATIONS ====================
    rating: {
      type: Number,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot exceed 5'],
      default: 0,
      set: (v) => Math.round(v * 10) / 10, // Round to 1 decimal
    },

    // Number of ratings (if we add review system later)
    ratingCount: {
      type: Number,
      default: 0,
    },

    // ==================== BOOK DETAILS ====================
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },

    // Inspirational quote from the book
    quote: {
      type: String,
      trim: true,
      maxlength: [300, 'Quote cannot exceed 300 characters'],
      default: '',
    },

    year: {
      type: Number,
      min: [1000, 'Year must be valid'],
      max: [new Date().getFullYear(), 'Year cannot be in the future'],
      required: [true, 'Publication year is required'],
    },

    // ==================== VISUAL ELEMENTS ====================
    image: {
      type: String,
      required: [true, 'Book cover image is required'],
      default: 'https://images.pexels.com/photos/762687/pexels-photo-762687.jpeg?w=600',
    },

    // ==================== AVAILABILITY (In-Cafe Reading) ====================
    // Books are always available for reading in cafe
    isAvailable: {
      type: Boolean,
      default: true,
      comment: 'Always true - books are always available to read in cafe',
    },

    // For featured section on homepage
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },

    // For sorting in collections
    displayOrder: {
      type: Number,
      default: 0,
    },

    // ==================== ADDITIONAL DETAILS ====================
    // Language of the book
    language: {
      type: String,
      enum: ['English', 'Urdu', 'Both'],
      default: 'English',
    },

    // Pages count (nice to have)
    pages: {
      type: Number,
      min: 0,
      default: 0,
    },

    // Publisher name
    publisher: {
      type: String,
      default: '',
    },

    // ISBN (optional)
    isbn: {
      type: String,
      default: '',
    },

    // ==================== METADATA ====================
    tags: {
      type: [String],
      default: [],
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ==================== INDEXES FOR PERFORMANCE ====================
bookSchema.index({ genre: 1, isFeatured: 1 });
bookSchema.index({ title: 'text', author: 'text', description: 'text', tags: 'text' });
bookSchema.index({ rating: -1 }); // For sorting by rating

// ==================== VIRTUAL FIELDS ====================

// Formatted rating with star emoji
bookSchema.virtual('formattedRating').get(function() {
  if (this.rating === 0) return 'Not rated yet';
  return `${this.rating} ★`;
});

// Full star rating display (for frontend)
bookSchema.virtual('starRating').get(function() {
  const fullStars = Math.floor(this.rating);
  const halfStar = this.rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  return {
    full: fullStars,
    half: halfStar,
    empty: emptyStars,
  };
});

// Display title with author
bookSchema.virtual('displayTitle').get(function() {
  return `${this.title} by ${this.author}`;
});

// ==================== INSTANCE METHODS ====================

// Toggle featured status
bookSchema.methods.toggleFeatured = function() {
  this.isFeatured = !this.isFeatured;
  return this.save();
};

// ==================== STATIC METHODS ====================

// Get all featured books (for homepage)
bookSchema.statics.getFeatured = function(limit = 6) {
  return this.find({ isFeatured: true })
    .sort({ rating: -1, displayOrder: 1 })
    .limit(limit);
};

// Get books by genre
bookSchema.statics.getByGenre = function(genre, limit = 50) {
  return this.find({ genre })
    .sort({ rating: -1 })
    .limit(limit);
};

// Get bestsellers (highest rated)
bookSchema.statics.getBestsellers = function(limit = 6) {
  return this.find({ rating: { $gt: 4.5 } })
    .sort({ rating: -1 })
    .limit(limit);
};

// Search books by title, author, or description
bookSchema.statics.search = function(query) {
  return this.find(
    { $text: { $search: query } },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });
};

// Get books by language
bookSchema.statics.getByLanguage = function(language, limit = 50) {
  return this.find({ language })
    .sort({ title: 1 })
    .limit(limit);
};

// Get random recommendation
bookSchema.statics.getRandomRecommendation = function() {
  return this.aggregate([
    { $match: { rating: { $gt: 4 } } },
    { $sample: { size: 1 } }
  ]);
};

// ==================== MIDDLEWARE ====================

// Pre-save hook - set default displayOrder
bookSchema.pre('save', async function(next) {
  if (this.isNew && this.displayOrder === 0) {
    const count = await this.constructor.countDocuments({ genre: this.genre });
    this.displayOrder = count + 1;
  }
  next();
});

// ==================== EXPORT ====================
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;