const Commodity = require('../models/Commodity');
const TcbTruck = require('../models/TcbTruck');
const ColdStorage = require('../models/ColdStorage');
const WhistleReport = require('../models/WhistleReport');
const RaidAction = require('../models/RaidAction');
const mockDataService = require('./mockDataService');

const seedInitialData = async () => {
  try {
    const commodityCount = await Commodity.countDocuments();
    if (commodityCount === 0) {
      console.log('[BazaarPulse] Seeding commodities into MongoDB...');
      await Commodity.insertMany(mockDataService.getCommodities());
    }

    const tcbCount = await TcbTruck.countDocuments();
    if (tcbCount === 0) {
      console.log('[BazaarPulse] Seeding TCB Trucks into MongoDB...');
      await TcbTruck.insertMany(mockDataService.getTcbTrucks());
    }

    const csCount = await ColdStorage.countDocuments();
    if (csCount === 0) {
      console.log('[BazaarPulse] Seeding Cold Storages into MongoDB...');
      await ColdStorage.insertMany(mockDataService.getColdStorages());
    }

    const raidCount = await RaidAction.countDocuments();
    if (raidCount === 0) {
      console.log('[BazaarPulse] Seeding Raid Actions into MongoDB...');
      await RaidAction.insertMany(mockDataService.getRaidActions());
    }

    console.log('[BazaarPulse] Database seeding verified.');
  } catch (err) {
    console.warn(`[BazaarPulse] MongoDB seeding skipped (${err.message}). In-memory active.`);
  }
};

module.exports = { seedInitialData };
