const express = require('express');
const router = express.Router();
const {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservationStatus,
  deleteReservation,
  checkAvailability,
} = require('../controllers/reservationController');

// ==================== PUBLIC ROUTES ====================
// These routes are accessible to everyone

// POST /api/reservations
// Create a new table reservation
router.post('/', createReservation);

// POST /api/reservations/check-availability
// Check if a time slot has available seats
router.post('/check-availability', checkAvailability);

// ==================== ADMIN ROUTES ====================
// These routes should be protected with authentication middleware in production
// They are kept separate for clarity and future authorization

// GET /api/reservations
// Fetch all reservations with optional filters (status, date)
router.get('/', getAllReservations);

// GET /api/reservations/:id
// Fetch a single reservation by ID
router.get('/:id', getReservationById);

// PATCH /api/reservations/:id/status
// Update reservation status (pending, confirmed, cancelled, completed)
router.patch('/:id/status', updateReservationStatus);

// DELETE /api/reservations/:id
// Delete a reservation
router.delete('/:id', deleteReservation);

module.exports = router;