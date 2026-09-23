const mongoose = require('mongoose');

const whistleReportSchema = new mongoose.Schema({
  trackingToken: { type: String, required: true, unique: true },
  marketName: { type: String, required: true },
  district: { type: String, required: true },
  shopNumberOrSeller: { type: String, default: '' },
  violationType: { 
    type: String, 
    enum: ['PRICE_GOUGING', 'DIGITAL_SCALE_FRAUD', 'ARTIFICIAL_HOARDING', 'REFUSAL_TO_SELL', 'MANDATORY_RECEIPT_ABSENCE'],
    required: true 
  },
  commodityInvolved: { type: String, required: true },
  chargedPrice: { type: Number, required: true },
  governmentCapPrice: { type: Number, required: true },
  overchargeMarginPct: { type: Number, default: 0 },
  evidenceReceiptUrl: { type: String, default: '' },
  gpsCoordinates: { type: String, default: '23.8103, 90.4125' },
  reporterPhone: { type: String, default: '' },
  isAnonymous: { type: Boolean, default: true },
  status: { 
    type: String, 
    enum: ['RECEIVED', 'VERIFYING', 'MAGISTRATE_DISPATCHED', 'FINE_IMPOSED', 'DISMISSED'], 
    default: 'RECEIVED' 
  },
  actionTakenNotes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WhistleReport', whistleReportSchema);
