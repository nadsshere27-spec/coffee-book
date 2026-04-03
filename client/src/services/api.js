import axios from 'axios';

// Base URL from environment or default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // ✅ increased to 60 seconds for Railway cold starts
});

// Request interceptor (for loading states, tokens, etc)
api.interceptors.request.use(
  (config) => {
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
  getAll: () => api.get('/menu'),
  getByCategory: (category) => api.get(`/menu/category/${category}`),
  getFeatured: () => api.get('/menu/featured'),
  getById: (id) => api.get(`/menu/${id}`),
  getHotCoffee: () => api.get('/menu/hot-coffee'),
  getColdCoffee: () => api.get('/menu/cold-coffee'),
  getBreakfast: () => api.get('/menu/breakfast'),
  getBakery: () => api.get('/menu/bakery'),
};

// ========== BAKERY API ==========
export const bakeryAPI = {
  getAll: () => api.get('/bakery'),
  getFeatured: () => api.get('/bakery/featured'),
  getById: (id) => api.get(`/bakery/${id}`),
};

// ========== BOOKS API ==========
export const booksAPI = {
  getAll: () => api.get('/books'),
  getByCategory: (category) => api.get(`/books/category/${category}`),
  search: (query) => api.get(`/books/search?q=${query}`),
  getFeatured: () => api.get('/books/featured'),
  getById: (id) => api.get(`/books/${id}`),
};

// ========== RESERVATION API ==========
export const reservationAPI = {
  create: (data) => api.post('/reservations', data),
  checkAvailability: (date, time, guests) =>
    api.post('/reservations/check', { date, time, guests }),
  getByPhone: (phone) => api.get(`/reservations/phone/${phone}`),
};

// ========== CONTACT API ==========
export const contactAPI = {
  send: (data) => api.post('/contact', data),
  subscribe: (email) => api.post('/contact/subscribe', { email }),
};

// ========== HELPER FUNCTIONS ==========
export const handleApiError = (error) => {
  if (error.response) {
    return error.response.data.message || 'Something went wrong';
  } else if (error.request) {
    return 'Cannot connect to server. Please check your connection.';
  } else {
    return 'An unexpected error occurred.';
  }
};

export default api;