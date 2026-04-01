const Reservation = require('../models/Reservation');

/**
 * Reservation Controller - Coffee BOOK
 * Handles table reservations (ready for future use)
 */

// ==================== CREATE RESERVATION ====================
const createReservation = async (req, res) => {
  try {
    const { name, phone, email, date, time, guests, occasion, specialRequests } = req.body;
    
    // Basic validation
    if (!name || !phone || !email || !date || !time || !guests) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone, email, date, time and guests are required',
      });
    }
    
    const reservation = new Reservation({
      name,
      phone,
      email,
      date,
      time,
      guests,
      occasion: occasion || '',
      specialRequests: specialRequests || '',
    });
    
    await reservation.save();
    
    res.status(201).json({
      success: true,
      message: 'Reservation created successfully',
      data: reservation,
    });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== GET ALL RESERVATIONS (Admin) ====================
const getAllReservations = async (req, res) => {
  try {
    const { status, date } = req.query;
    
    let query = {};
    if (status) query.status = status;
    if (date) query.date = new Date(date);
    
    const reservations = await Reservation.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations,
    });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== GET RESERVATION BY ID ====================
const getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const reservation = await Reservation.findById(id);
    
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: reservation,
    });
  } catch (error) {
    console.error('Error fetching reservation:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== UPDATE RESERVATION STATUS ====================
const updateReservationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }
    
    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: reservation,
      message: `Reservation ${status}`,
    });
  } catch (error) {
    console.error('Error updating reservation:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== DELETE RESERVATION (Admin) ====================
const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    
    const reservation = await Reservation.findByIdAndDelete(id);
    
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Reservation deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== CHECK AVAILABILITY (Future) ====================
const checkAvailability = async (req, res) => {
  try {
    const { date, time, guests } = req.body;
    
    // Simple availability check (can be enhanced later)
    const existingReservations = await Reservation.find({
      date: new Date(date),
      time,
      status: { $in: ['pending', 'confirmed'] }
    });
    
    const totalGuests = existingReservations.reduce((sum, r) => sum + r.guests, 0);
    const maxCapacity = 50;
    const available = (totalGuests + guests) <= maxCapacity;
    
    res.status(200).json({
      success: true,
      available,
      availableSeats: maxCapacity - totalGuests,
      totalBooked: totalGuests,
    });
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservationStatus,
  deleteReservation,
  checkAvailability,
};