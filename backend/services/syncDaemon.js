const cron = require('node-cron');
const externalAgroService = require('./externalAgroService');

const initSyncDaemon = () => {
  console.log('[BazaarPulse] Initializing Agrometeorological & Forex Sync Daemon (Every 15 min)...');

  // Initial trigger immediately
  Promise.all([
    externalAgroService.fetchLiveForex(),
    externalAgroService.fetchAgroWeather()
  ]).then(() => {
    console.log('[BazaarPulse] Initial Forex & Agro-weather telemetry synchronized.');
  }).catch((err) => {
    console.warn('[BazaarPulse] Initial sync warning:', err.message);
  });

  // Scheduled cron every 15 minutes
  cron.schedule('*/15 * * * *', async () => {
    console.log('[BazaarPulse] Scheduled sync daemon running...');
    try {
      await Promise.all([
        externalAgroService.fetchLiveForex(),
        externalAgroService.fetchAgroWeather()
      ]);
      console.log('[BazaarPulse] Telemetry sync completed successfully.');
    } catch (err) {
      console.error('[BazaarPulse] Scheduled sync error:', err.message);
    }
  });
};

module.exports = { initSyncDaemon };
