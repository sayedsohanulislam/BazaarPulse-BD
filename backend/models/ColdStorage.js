const mongoose = require('mongoose');

const coldStorageSchema = new mongoose.Schema({
  facilityName: { type: String, required: true },
  district: { type: String, required: true },
  upazila: { type: String, required: true },
  commodityStored: { type: String, default: 'Potato (আলু)' },
  capacityBags: { type: Number, required: true },
  currentStockBags: { type: Number, required: true },
  occupancyPercent: { type: Number, default: 85 },
  gateReleasePriceKg: { type: Number, required: true }, // e.g. 28 BDT/kg
  rentPerBagPerMonth: { type: Number, default: 350 },
  inspectionStatus: { 
    type: String, 
    enum: ['REGULAR_RELEASE', 'HOARDING_SUSPECTED', 'RAID_SEALED', 'COMPLIANT'], 
    default: 'COMPLIANT' 
  },
  ownerName: { type: String, default: '' },
  lastInspectedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ColdStorage', coldStorageSchema);
