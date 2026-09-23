const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB, getDbStatus } = require('./config/db');
const { seedInitialData } = require('./services/seedService');
const { initSyncDaemon } = require('./services/syncDaemon');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5004;

app.use(cors());
app.use(express.json());

// Mount API routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/commodities', require('./routes/commodityRoutes'));
app.use('/api/tcb', require('./routes/tcbRoutes'));
app.use('/api/hoarding', require('./routes/hoardingRoutes'));
app.use('/api/whistle', require('./routes/whistleRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/authority', require('./routes/authorityRoutes'));

// System status / health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    project: 'BazaarPulse BD',
    platform: 'National Kitchen Market Fair Pricing & Anti-Gouging Intelligence',
    database: getDbStatus(),
    timestamp: new Date().toISOString()
  });
});

const startServer = async () => {
  const isMongoReady = await connectDB();
  if (isMongoReady) {
    await seedInitialData();
  }
  initSyncDaemon();

  if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
      console.log(`[BazaarPulse] Server running on http://localhost:${PORT}`);
    });
  }
};

startServer();

module.exports = app;
