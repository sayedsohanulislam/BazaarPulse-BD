const mongoose = require('mongoose');

const raidActionSchema = new mongoose.Schema({
  magistrateName: { type: String, required: true },
  agency: { type: String, default: 'DNCRP (জাতীয় ভোক্তা-অধিকার সংরক্ষণ অধিদপ্তর)' },
  targetMarket: { type: String, required: true },
  district: { type: String, required: true },
  infraction: { type: String, required: true },
  fineAmountBdt: { type: Number, required: true },
  goodsSeizedKg: { type: Number, default: 0 },
  shopsSealedCount: { type: Number, default: 0 },
  sectionViolated: { type: String, default: 'Consumer Rights Protection Act 2009 (Sec 40, 45)' },
  raidDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RaidAction', raidActionSchema);
