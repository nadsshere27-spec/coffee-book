const Contact = require('../models/Contact');

/**
 * Contact Controller - Coffee BOOK
 * Handles contact form submissions (ready for future use)
 */

// ==================== CREATE CONTACT MESSAGE ====================
const createContactMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and message are required',
      });
    }
    
    const contact = new Contact({
      name,
      email,
      phone: phone || '',
      message,
    });
    
    await contact.save();
    
    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: contact,
    });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== GET ALL MESSAGES (Admin) ====================
const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== GET SINGLE MESSAGE ====================
const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const message = await Contact.findById(id);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ==================== DELETE MESSAGE (Admin) ====================
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    
    const message = await Contact.findByIdAndDelete(id);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

module.exports = {
  createContactMessage,
  getAllMessages,
  getMessageById,
  deleteMessage,
};