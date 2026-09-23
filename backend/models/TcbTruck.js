const mongoose = require('mongoose');

const tcbTruckSchema = new mongoose.Schema({
  locationName: { type: String, required: true },
  locationNameBn: { type: String, required: true },
  thana: { type: String, required: true },
  district: { type: String, default: 'Dhaka' },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  arrivalStatus: { type: String, enum: ['DISPATCHED', 'STATIONED_SELLING', 'STOCK_OUT', 'SCHEDULED'], default: 'STATIONED_SELLING' },
  stockLevels: {
    soybeanOilLiters: { type: Number, default: 400 },
    lentilsKg: { type: Number, default: 350 },
    sugarKg: { type: Number, default: 300 },
    riceKg: { type: Number, default: 500 },
    onionKg: { type: Number, default: 400 }
  },
  subsidizedRates: {
    soybeanOilPerLtr: { type: Number, default: 100 }, // Market ~165
    lentilsPerKg: { type: Number, default: 60 },      // Market ~110
    sugarPerKg: { type: Number, default: 70 },        // Market ~130
    ricePerKg: { type: Number, default: 30 },         // Market ~60
    onionPerKg: { type: Number, default: 40 }         // Market ~95
  },
  allocatedQuotaPerCitizen: { type: String, default: '2L Oil, 2kg Lentils, 1kg Sugar, 5kg Rice' },
  dealerPhone: { type: String, default: '01711-XXXXXX' },
  queueEstimatedWaitMins: { type: Number, default: 35 },
  lastStockUpdate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TcbTruck', tcbTruckSchema);
