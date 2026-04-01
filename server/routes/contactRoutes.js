const express = require('express');
const router = express.Router();
const {
  createContactMessage,
  getAllMessages,
  getMessageById,
  deleteMessage,
} = require('../controllers/contactController');

// ==================== PUBLIC ROUTES ====================
// These routes are accessible to everyone

// POST /api/contact
// Submit a contact form message
router.post('/', createContactMessage);

// ==================== ADMIN ROUTES ====================
// These routes should be protected with authentication middleware in production
// They are kept separate for clarity and future authorization

// GET /api/contact
// Fetch all contact messages (admin only)
router.get('/', getAllMessages);

// GET /api/contact/:id
// Fetch a single contact message by ID (admin only)
router.get('/:id', getMessageById);

// DELETE /api/contact/:id
// Delete a contact message (admin only)
router.delete('/:id', deleteMessage);

module.exports = router;