const mongoose = require('mongoose');

let isConnected = false;
let useMemoryFallback = false;

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bazaarpulse_bd';
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000
    });
    isConnected = true;
    useMemoryFallback = false;
    console.log(`[BazaarPulse] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (err) {
    console.warn(`[BazaarPulse] MongoDB connection failed (${err.message}). Activating resilient In-Memory Store.`);
    isConnected = false;
    useMemoryFallback = true;
    return false;
  }
};

const getDbStatus = () => ({
  isConnected,
  useMemoryFallback,
  mode: useMemoryFallback ? 'IN_MEMORY_FALLBACK' : 'MONGODB_ATLAS'
});

module.exports = { connectDB, getDbStatus };
