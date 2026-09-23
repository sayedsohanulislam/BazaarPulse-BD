const mongoose = require('mongoose');

const commoditySchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameBn: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Vegetables', 'Grains & Rice', 'Oils & Fats', 'Poultry & Meat', 'Fish', 'Spices', 'Lentils & Pulses', 'Sugar & Sweeteners'],
    required: true 
  },
  unit: { type: String, default: 'kg' }, // kg, liter, piece, hali, quintal
  damFairPriceMin: { type: Number, required: true },
  damFairPriceMax: { type: Number, required: true },
  karwanBazarWholesale: { type: Number, required: true },
  retailAvgPrice: { type: Number, required: true },
  yesterdayPrice: { type: Number, required: true },
  deltaPercent: { type: Number, default: 0 },
  volatilityIndex: { type: String, enum: ['STABLE', 'MODERATE', 'SURGING', 'CRISIS'], default: 'STABLE' },
  syndicateRiskScore: { type: Number, default: 15 }, // 0 to 100
  supplyOrigin: { type: String, default: 'Domestic' }, // Domestic, India, Brazil, Canada
  image: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Commodity', commoditySchema);
