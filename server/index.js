const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const colors = require('colors');

dotenv.config();

const { connectDB, checkDatabaseHealth, getConnectionStats } = require('./config/db');

const menuRoutes = require('./routes/menuRoutes');
const booksRoutes = require('./routes/booksRoutes');
const contactRoutes = require('./routes/contactRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== SECURITY & PERFORMANCE ====================

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5176',
    'https://coffee-book-eight.vercel.app',
    'https://coffee-book-eight.vercel.app/'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ✅ Handle preflight requests (ADD THIS LINE)
app.options('*', cors());

app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
});
app.use('/api/', limiter);

// Custom request logger (professional)
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} - ${duration}ms`.gray);
  });
  next();
});

// ==================== ROUTES ====================

app.get('/health', async (req, res) => {
  const dbHealth = await checkDatabaseHealth();
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: dbHealth,
  });
});

app.get('/api/status', async (req, res) => {
  const dbStats = getConnectionStats();
  res.json({
    server: {
      status: 'running',
      uptime: process.uptime(),
      port: PORT,
    },
    database: dbStats,
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (req, res) => {
  res.json({
    name: 'Coffee BOOK API',
    version: '1.0.0',
    endpoints: {
      menu: '/api/menu',
      books: '/api/books',
      contact: '/api/contact',
      reservations: '/api/reservations',
      status: '/api/status',
      health: '/health',
    },
  });
});

app.use('/api/menu', menuRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/reservations', reservationRoutes);

// ==================== ERROR HANDLING ====================

app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`.red);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      message: err.message,
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      error: 'Duplicate Error',
      message: 'Field already exists',
    });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString(),
  });
});

// ==================== START SERVER ====================

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`
╔══════════════════════════════════════════════════════════╗
║  Coffee BOOK Server is Running                           ║
║                                                          ║
║  Server: http://localhost:${PORT}                         ║
║  API:    http://localhost:${PORT}/api                     ║
║  Health: http://localhost:${PORT}/health                 ║
║                                                          ║
║  Environment: ${process.env.NODE_ENV || 'development'}                           ║
║  Routes: menu | books | contact | reservations           ║
╚══════════════════════════════════════════════════════════╝
      `.cyan);
    });
  } catch (error) {
    console.error(`[ERROR] Failed to start server: ${error.message}`.red);
    process.exit(1);
  }
};

startServer();