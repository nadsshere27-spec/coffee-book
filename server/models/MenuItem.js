const mongoose = require('mongoose');

/**
 * Menu Item Schema - Coffee BOOK
 * Stores all menu items including:
 * - Hot Coffee (served in cups)
 * - Cold Coffee (served in glasses)
 * - Breakfast items
 * - Bakery items
 * 
 * Each item has category, serving style, and premium details
 */

const menuItemSchema = new mongoose.Schema(
  {
    // ==================== BASIC INFORMATION ====================
    name: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
      index: true,
    },

    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },

    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [50, 'Price cannot be less than RS 50'],
      max: [5000, 'Price cannot exceed RS 5000'],
    },

    // ==================== CATEGORY & SERVING STYLE ====================
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['hot', 'cold', 'breakfast', 'bakery'],
      index: true,
      comment: 'hot: coffee in cups | cold: coffee in glasses | breakfast: food items | bakery: pastries',
    },

    // Serving style - specifically for hot/cold coffee distinction
    servedIn: {
      type: String,
      enum: ['cup', 'glass', 'plate', 'box'],
      default: function() {
        if (this.category === 'hot') return 'cup';
        if (this.category === 'cold') return 'glass';
        if (this.category === 'breakfast') return 'plate';
        return 'box';
      },
      comment: 'cup: hot coffee | glass: cold coffee | plate: breakfast | box: bakery',
    },

    // ==================== VISUAL ELEMENTS ====================
    image: {
      type: String,
      required: [true, 'Image URL is required'],
      default: function() {
        if (this.category === 'hot') {
          return 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600';
        }
        if (this.category === 'cold') {
          return 'https://images.pexels.com/photos/1234567/pexels-photo-1234567.jpeg?w=600';
        }
        if (this.category === 'breakfast') {
          return 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?w=600';
        }
        return 'https://images.pexels.com/photos/461060/pexels-photo-461060.jpeg?w=600';
      },
    },

    // Badge for special items (Bestseller, New, Limited, etc)
    badge: {
      type: String,
      enum: ['', 'Bestseller', 'New', 'Staff Pick', 'Limited', 'Popular', 'Seasonal', 'Artisan', 'Gluten-Free', 'Vegan'],
      default: '',
    },

    // ==================== AVAILABILITY & FEATURES ====================
    isAvailable: {
      type: Boolean,
      default: true,
      index: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },

    // For custom sorting in menu pages
    displayOrder: {
      type: Number,
      default: 0,
    },

    // ==================== PREMIUM DETAILS ====================
    // For coffee items (hot/cold)
    coffeeType: {
      type: String,
      enum: ['', 'espresso', 'latte', 'cappuccino', 'mocha', 'americano', 'cold-brew', 'iced-latte'],
      default: '',
      comment: 'Specific coffee type for coffee items',
    },

    // For breakfast & bakery items
    dietary: {
      type: String,
      enum: ['', 'vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free'],
      default: '',
    },

    calories: {
      type: String,
      default: '',
      comment: 'Calorie info e.g., "320 kcal"',
    },

    preparationTime: {
      type: String,
      default: '5-10 mins',
      comment: 'Estimated preparation time',
    },

    // For hot/cold coffee distinction in images
    imageStyle: {
      type: String,
      enum: ['cup', 'glass', 'plate', 'box'],
      default: function() {
        return this.servedIn;
      },
      comment: 'How the item should be displayed in images',
    },

    // ==================== STOCK & INVENTORY (Optional) ====================
    inStock: {
      type: Boolean,
      default: true,
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
menuItemSchema.index({ category: 1, isAvailable: 1 });
menuItemSchema.index({ isFeatured: 1, displayOrder: 1 });
menuItemSchema.index({ name: 'text', description: 'text', tags: 'text' });
menuItemSchema.index({ category: 1, servedIn: 1 });

// ==================== VIRTUAL FIELDS ====================

// Formatted price with RS currency
menuItemSchema.virtual('formattedPrice').get(function() {
  return `RS ${this.price.toLocaleString()}`;
});

// Full description with dietary info
menuItemSchema.virtual('fullDescription').get(function() {
  let desc = this.description;
  if (this.dietary) {
    desc += ` (${this.dietary})`;
  }
  if (this.calories) {
    desc += ` • ${this.calories}`;
  }
  return desc;
});

// Serving style text for frontend
menuItemSchema.virtual('servingStyle').get(function() {
  if (this.category === 'hot') return 'Served in ceramic cup ☕';
  if (this.category === 'cold') return 'Served in glass with ice 🧊';
  if (this.category === 'breakfast') return 'Served fresh 🍳';
  return 'Freshly baked 🥐';
});

// ==================== INSTANCE METHODS ====================

// Toggle availability
menuItemSchema.methods.toggleAvailability = function() {
  this.isAvailable = !this.isAvailable;
  return this.save();
};

// Toggle featured status
menuItemSchema.methods.toggleFeatured = function() {
  this.isFeatured = !this.isFeatured;
  return this.save();
};

// ==================== STATIC METHODS ====================

// Get all featured items
menuItemSchema.statics.getFeatured = function(limit = 6) {
  return this.find({ isFeatured: true, isAvailable: true })
    .sort({ displayOrder: 1 })
    .limit(limit);
};

// Get items by category (hot, cold, breakfast, bakery)
menuItemSchema.statics.getByCategory = function(category, limit = 50) {
  return this.find({ category, isAvailable: true })
    .sort({ displayOrder: 1 })
    .limit(limit);
};

// Get hot coffee (served in cups)
menuItemSchema.statics.getHotCoffee = function(limit = 20) {
  return this.find({ category: 'hot', isAvailable: true })
    .sort({ displayOrder: 1 })
    .limit(limit);
};

// Get cold coffee (served in glasses)
menuItemSchema.statics.getColdCoffee = function(limit = 20) {
  return this.find({ category: 'cold', isAvailable: true })
    .sort({ displayOrder: 1 })
    .limit(limit);
};

// Get breakfast items
menuItemSchema.statics.getBreakfast = function(limit = 20) {
  return this.find({ category: 'breakfast', isAvailable: true })
    .sort({ displayOrder: 1 })
    .limit(limit);
};

// Get bakery items
menuItemSchema.statics.getBakery = function(limit = 20) {
  return this.find({ category: 'bakery', isAvailable: true })
    .sort({ displayOrder: 1 })
    .limit(limit);
};

// Search items by name or description
menuItemSchema.statics.search = function(query) {
  return this.find(
    { $text: { $search: query }, isAvailable: true },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });
};

// ==================== MIDDLEWARE ====================

// Pre-save hook - set default displayOrder
menuItemSchema.pre('save', async function(next) {
  if (this.isNew && this.displayOrder === 0) {
    const count = await this.constructor.countDocuments({ category: this.category });
    this.displayOrder = count + 1;
  }
  next();
});

// ==================== EXPORT ====================
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;