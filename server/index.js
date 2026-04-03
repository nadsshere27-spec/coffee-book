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

// ==================== CORS CONFIGURATION ====================
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  'https://coffee-book-eight.vercel.app',
  'https://sparkling-possibility.up.railway.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(`Blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Handle preflight requests
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

// Custom request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} - ${duration}ms`.gray);
  });
  next();
});

// ==================== HEALTH CHECK (FAST, NO DB DEPENDENCY) ====================
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'coffee-book-api'
  });
});

// ==================== ROUTES ====================

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
  app.listen(PORT, '0.0.0.0', () => {
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

  try {
    await connectDB();
    console.log('✅ Database connected successfully'.green);
  } catch (error) {
    console.error(`❌ DB connection failed: ${error.message}`.red);
  }
};

startServer();