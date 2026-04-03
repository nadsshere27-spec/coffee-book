const mongoose = require('mongoose');
const dns = require('dns');
const colors = require('colors');

// Force DNS servers to bypass local DNS issues
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Custom logger for Coffee BOOK
const dbLogger = {
  info: (msg) => console.log(`[DB] ${msg}`.gray),
  success: (msg) => console.log(`[DB] ${msg}`.green),
  error: (msg) => console.log(`[DB] ${msg}`.red),
  warn: (msg) => console.log(`[DB] ${msg}`.yellow),
  connect: (host, name) => console.log(`\n[DB] Connected to MongoDB\n[DB] Host: ${host}\n[DB] Database: ${name}\n`.green),
};

// Updated connection options
const connectionOptions = {
  serverSelectionTimeoutMS: 15000,  // increased from 8000
  socketTimeoutMS: 60000,           // increased from 45000
  maxPoolSize: 20,
  minPoolSize: 5,
  retryWrites: true,
  retryReads: true,
  heartbeatFrequencyMS: 10000,
};

// Connection state
let connectionState = {
  isConnected: false,
  retryCount: 0,
  maxRetries: 5,        // increased from 3
  retryDelay: 5000,     // increased from 3000
};

// Connect to MongoDB
const connectDB = async () => {
  try {
    dbLogger.info('Connecting to MongoDB...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, connectionOptions);
    
    connectionState.isConnected = true;
    connectionState.retryCount = 0;
    
    dbLogger.connect(conn.connection.host, conn.connection.name);
    
    setupEventListeners();
    
    return conn;
    
  } catch (error) {
    dbLogger.error(`Connection failed: ${error.message}`);
    
    if (connectionState.retryCount < connectionState.maxRetries) {
      connectionState.retryCount++;
      dbLogger.warn(`Retry ${connectionState.retryCount}/${connectionState.maxRetries} in ${connectionState.retryDelay / 1000}s...`);
      
      setTimeout(() => {
        connectDB();
      }, connectionState.retryDelay);
    } else {
      // ✅ Don't exit — keep server alive so API still responds
      dbLogger.error('Maximum retries reached. Server will continue without DB.');
      dbLogger.warn('Some API routes may not work until DB reconnects.');
    }
  }
};

// Setup MongoDB event listeners
const setupEventListeners = () => {
  mongoose.connection.on('connected', () => {
    dbLogger.success('Connection established');
  });
  
  mongoose.connection.on('error', (err) => {
    dbLogger.error(`Connection error: ${err.message}`);
    connectionState.isConnected = false;
  });
  
  mongoose.connection.on('disconnected', () => {
    dbLogger.warn('Disconnected. Reconnecting...');
    connectionState.isConnected = false;
    
    setTimeout(() => {
      if (!connectionState.isConnected) {
        connectionState.retryCount = 0; // ✅ reset retry count on disconnect
        connectDB();
      }
    }, 3000);
  });
  
  mongoose.connection.on('reconnected', () => {
    dbLogger.success('Reconnected successfully');
    connectionState.isConnected = true;
  });
};

// Graceful shutdown
const gracefulShutdown = async () => {
  dbLogger.warn('Shutting down...');
  
  if (connectionState.isConnected) {
    try {
      await mongoose.connection.close();
      dbLogger.success('Connection closed');
      process.exit(0);
    } catch (error) {
      dbLogger.error(`Shutdown error: ${error.message}`);
      process.exit(1);
    }
  } else {
    process.exit(0);
  }
};

// Health check
const checkDatabaseHealth = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.db.admin().ping();
      return {
        status: 'healthy',
        message: 'Connected',
        readyState: mongoose.connection.readyState,
        host: mongoose.connection.host,
        name: mongoose.connection.name,
      };
    }
    return {
      status: 'unhealthy',
      message: 'Not connected',
      readyState: mongoose.connection.readyState,
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
    };
  }
};

// Get connection stats
const getConnectionStats = () => ({
  isConnected: connectionState.isConnected,
  readyState: mongoose.connection.readyState,
  host: mongoose.connection.host,
  name: mongoose.connection.name,
  models: Object.keys(mongoose.models),
});

// Process handlers
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

module.exports = {
  connectDB,
  getConnection: () => mongoose.connection,
  isConnected: () => connectionState.isConnected,
  getConnectionStats,
  checkDatabaseHealth,
  disconnect: async () => {
    await mongoose.disconnect();
    connectionState.isConnected = false;
    dbLogger.success('Disconnected');
  },
};