const MenuItem = require('../models/MenuItem');

/**
 * Menu Controller - Coffee BOOK
 * Handles all menu-related operations
 * Supports: hot coffee, cold coffee, breakfast, bakery items
 */

// ==================== GET ALL MENU ITEMS ====================
const getAllMenuItems = async (req, res) => {
  try {
    const { category, featured, limit = 50, sort = 'displayOrder' } = req.query;
    
    let query = {};
    
    // Filter by category (hot, cold, breakfast, bakery)
    if (category) {
      query.category = category;
    }
    
    // Filter featured items
    if (featured === 'true') {
      query.isFeatured = true;
    }
    
    // Only show available items
    query.isAvailable = true;
    
    let items = MenuItem.find(query);
    
    // Sorting
    if (sort === 'price_asc') items = items.sort({ price: 1 });
    else if (sort === 'price_desc') items = items.sort({ price: -1 });
    else if (sort === 'name') items = items.sort({ name: 1 });
    else items = items.sort({ displayOrder: 1 });
    
    // Limit
    items = items.limit(parseInt(limit));
    
    const menuItems = await items;
    
    res.status(200).json({
      success: true,
      count: menuItems.length,
      data: menuItems,
    });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== GET SINGLE MENU ITEM ====================
const getMenuItemById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const menuItem = await MenuItem.findById(id);
    
    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    console.error('Error fetching menu item:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== GET HOT COFFEE (Served in cups) ====================
const getHotCoffee = async (req, res) => {
  try {
    const { limit = 20, sort = 'displayOrder' } = req.query;
    
    let query = {
      category: 'hot',
      isAvailable: true,
    };
    
    let items = MenuItem.find(query);
    
    if (sort === 'price_asc') items = items.sort({ price: 1 });
    else if (sort === 'price_desc') items = items.sort({ price: -1 });
    else items = items.sort({ displayOrder: 1 });
    
    items = items.limit(parseInt(limit));
    
    const hotCoffee = await items;
    
    res.status(200).json({
      success: true,
      count: hotCoffee.length,
      data: hotCoffee,
    });
  } catch (error) {
    console.error('Error fetching hot coffee:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== GET COLD COFFEE (Served in glasses) ====================
const getColdCoffee = async (req, res) => {
  try {
    const { limit = 20, sort = 'displayOrder' } = req.query;
    
    let query = {
      category: 'cold',
      isAvailable: true,
    };
    
    let items = MenuItem.find(query);
    
    if (sort === 'price_asc') items = items.sort({ price: 1 });
    else if (sort === 'price_desc') items = items.sort({ price: -1 });
    else items = items.sort({ displayOrder: 1 });
    
    items = items.limit(parseInt(limit));
    
    const coldCoffee = await items;
    
    res.status(200).json({
      success: true,
      count: coldCoffee.length,
      data: coldCoffee,
    });
  } catch (error) {
    console.error('Error fetching cold coffee:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== GET BREAKFAST ITEMS ====================
const getBreakfast = async (req, res) => {
  try {
    const { limit = 20, sort = 'displayOrder' } = req.query;
    
    let query = {
      category: 'breakfast',
      isAvailable: true,
    };
    
    let items = MenuItem.find(query);
    
    if (sort === 'price_asc') items = items.sort({ price: 1 });
    else if (sort === 'price_desc') items = items.sort({ price: -1 });
    else items = items.sort({ displayOrder: 1 });
    
    items = items.limit(parseInt(limit));
    
    const breakfast = await items;
    
    res.status(200).json({
      success: true,
      count: breakfast.length,
      data: breakfast,
    });
  } catch (error) {
    console.error('Error fetching breakfast items:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== GET BAKERY ITEMS ====================
const getBakery = async (req, res) => {
  try {
    const { limit = 20, sort = 'displayOrder' } = req.query;
    
    let query = {
      category: 'bakery',
      isAvailable: true,
    };
    
    let items = MenuItem.find(query);
    
    if (sort === 'price_asc') items = items.sort({ price: 1 });
    else if (sort === 'price_desc') items = items.sort({ price: -1 });
    else items = items.sort({ displayOrder: 1 });
    
    items = items.limit(parseInt(limit));
    
    const bakery = await items;
    
    res.status(200).json({
      success: true,
      count: bakery.length,
      data: bakery,
    });
  } catch (error) {
    console.error('Error fetching bakery items:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== GET FEATURED ITEMS ====================
const getFeaturedItems = async (req, res) => {
  try {
    const { limit = 6 } = req.query;
    
    const featured = await MenuItem.find({
      isFeatured: true,
      isAvailable: true,
    })
      .sort({ displayOrder: 1 })
      .limit(parseInt(limit));
    
    res.status(200).json({
      success: true,
      count: featured.length,
      data: featured,
    });
  } catch (error) {
    console.error('Error fetching featured items:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== SEARCH MENU ITEMS ====================
const searchMenuItems = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      });
    }
    
    const results = await MenuItem.find(
      { $text: { $search: q }, isAvailable: true },
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
    console.error('Error searching menu:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== CREATE MENU ITEM (Admin Only - Future) ====================
const createMenuItem = async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    await menuItem.save();
    
    res.status(201).json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    console.error('Error creating menu item:', error);
    
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

// ==================== UPDATE MENU ITEM (Admin Only - Future) ====================
const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    
    const menuItem = await MenuItem.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== DELETE MENU ITEM (Admin Only - Future) ====================
const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    
    const menuItem = await MenuItem.findByIdAndDelete(id);
    
    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Menu item deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== TOGGLE AVAILABILITY ====================
const toggleAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    
    const menuItem = await MenuItem.findById(id);
    
    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found',
      });
    }
    
    menuItem.isAvailable = !menuItem.isAvailable;
    await menuItem.save();
    
    res.status(200).json({
      success: true,
      data: menuItem,
      message: `Item ${menuItem.isAvailable ? 'available' : 'unavailable'} now`,
    });
  } catch (error) {
    console.error('Error toggling availability:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

module.exports = {
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
};