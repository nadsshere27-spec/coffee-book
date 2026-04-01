const express = require('express');
const router = express.Router();
const {
  getAllMenuItems,
  getMenuItemById,
  getHotCoffee,
  getColdCoffee,
  getBreakfast,
  getBakery,
  getFeaturedItems,
  searchMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability,
} = require('../controllers/menuController');

// ==================== PUBLIC ROUTES ====================
// These routes are accessible to everyone without authentication

// GET /api/menu
// Fetch all menu items with optional filters (category, featured, limit, sort)
router.get('/', getAllMenuItems);

// GET /api/menu/featured
// Returns featured items for homepage (limit optional)
router.get('/featured', getFeaturedItems);

// GET /api/menu/search?q=latte
// Text search across name and description
router.get('/search', searchMenuItems);

// GET /api/menu/hot-coffee
// Returns all hot coffee items (served in cups)
router.get('/hot-coffee', getHotCoffee);

// GET /api/menu/cold-coffee
// Returns all cold coffee items (served in glasses)
router.get('/cold-coffee', getColdCoffee);

// GET /api/menu/breakfast
// Returns all breakfast items
router.get('/breakfast', getBreakfast);

// GET /api/menu/bakery
// Returns all bakery items
router.get('/bakery', getBakery);

// GET /api/menu/:id
// Fetch a single menu item by its MongoDB ID
router.get('/:id', getMenuItemById);

// ==================== ADMIN ROUTES ====================
// These routes should be protected with authentication middleware in production
// They are kept separate for clarity and future authorization

// POST /api/menu
// Create a new menu item (admin only)
router.post('/', createMenuItem);

// PUT /api/menu/:id
// Fully update an existing menu item (admin only)
router.put('/:id', updateMenuItem);

// PATCH /api/menu/:id/toggle-availability
// Toggle isAvailable status (admin only)
router.patch('/:id/toggle-availability', toggleAvailability);

// DELETE /api/menu/:id
// Remove a menu item from the database (admin only)
router.delete('/:id', deleteMenuItem);

module.exports = router;