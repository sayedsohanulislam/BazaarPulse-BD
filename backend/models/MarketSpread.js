const mongoose = require('mongoose');

const marketSpreadSchema = new mongoose.Schema({
  marketName: { type: String, required: true },
  marketNameBn: { type: String, required: true },
  district: { type: String, required: true },
  marketType: { type: String, enum: ['WHOLESALE_ARAT', 'URBAN_KITCHEN_RETAIL', 'SUPERMARKET'], default: 'URBAN_KITCHEN_RETAIL' },
  coordinates: {
    lat: { type: Number, default: 23.8103 },
    lng: { type: Number, default: 90.4125 }
  },
  items: [{
    commodityName: String,
    price: Number,
    wholesaleComparisonDiff: Number // e.g. +15 BDT vs Karwan Bazar
  }],
  lastAuditedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MarketSpread', marketSpreadSchema);
