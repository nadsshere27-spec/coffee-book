import axios from 'axios';

// Base URL from environment or default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor (for loading states, tokens, etc)
api.interceptors.request.use(
  (config) => {
    // You can add loading state here later if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (for error handling)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors gracefully
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - server not responding');
    } else if (!error.response) {
      console.error('Network error - cannot connect to server');
    }
    return Promise.reject(error);
  }
);

// ========== MENU API ==========
export const menuAPI = {
  // Get all menu items
  getAll: () => api.get('/menu'),
  
  // Get menu items by category
  getByCategory: (category) => api.get(`/menu/category/${category}`),
  
  // Get featured items
  getFeatured: () => api.get('/menu/featured'),
  
  // Get single menu item
  getById: (id) => api.get(`/menu/${id}`),
};

// ========== BAKERY API ==========
export const bakeryAPI = {
  // Get all bakery items
  getAll: () => api.get('/bakery'),
  
  // Get featured bakery items
  getFeatured: () => api.get('/bakery/featured'),
  
  // Get single bakery item
  getById: (id) => api.get(`/bakery/${id}`),
};

// ========== BOOKS API ==========
export const booksAPI = {
  // Get all books
  getAll: () => api.get('/books'),
  
  // Get books by category
  getByCategory: (category) => api.get(`/books/category/${category}`),
  
  // Search books
  search: (query) => api.get(`/books/search?q=${query}`),
  
  // Get featured books
  getFeatured: () => api.get('/books/featured'),
  
  // Get single book
  getById: (id) => api.get(`/books/${id}`),
};

// ========== RESERVATION API ==========
export const reservationAPI = {
  // Create new reservation
  create: (data) => api.post('/reservations', data),
  
  // Check availability
  checkAvailability: (date, time, guests) => 
    api.post('/reservations/check', { date, time, guests }),
  
  // Get reservations by phone (for checking your bookings)
  getByPhone: (phone) => api.get(`/reservations/phone/${phone}`),
};

// ========== CONTACT API ==========
export const contactAPI = {
  // Send contact form
  send: (data) => api.post('/contact', data),
  
  // Subscribe to newsletter
  subscribe: (email) => api.post('/contact/subscribe', { email }),
};

// ========== HELPER FUNCTIONS ==========
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    return error.response.data.message || 'Something went wrong';
  } else if (error.request) {
    // Request made but no response
    return 'Cannot connect to server. Please check your connection.';
  } else {
    // Something else happened
    return 'An unexpected error occurred.';
  }
};

export default api;