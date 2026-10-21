const RaidAction = require('../models/RaidAction');
const AuditLog = require('../models/AuditLog');
const mockDataService = require('../services/mockDataService');
const { getDbStatus } = require('../config/db');

let activeBulletins = [
  {
    id: 'b1',
    title: 'DNCRP Nationwide Crackdown on Potato & Egg Hoarders',
    titleBn: 'DNCRP Nationwide Crackdown on Potato & Egg Hoarders',
    severity: 'HIGH',
    directive: 'Retailers must display DAM indicative price board. Hoarding cold storage potato above 30 Tk gate price prohibited.',
    issuedAt: new Date().toISOString()
  }
];

exports.getRaids = async (req, res) => {
  try {
    const { useMemoryFallback } = getDbStatus();
    let raids;
    if (useMemoryFallback) {
      raids = mockDataService.getRaidActions();
    } else {
      raids = await RaidAction.find().sort({ raidDate: -1 });
      if (!raids || raids.length === 0) raids = mockDataService.getRaidActions();
    }
    res.json({ success: true, count: raids.length, data: raids });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.logRaid = async (req, res) => {
  try {
    const { magistrateName, targetMarket, district, infraction, fineAmountBdt, goodsSeizedKg, shopsSealedCount } = req.body;
    const { useMemoryFallback } = getDbStatus();

    const newRaid = {
      id: `r_${Date.now()}`,
      magistrateName: magistrateName || 'Executive Magistrate',
      agency: 'DNCRP & Mobile Court',
      targetMarket,
      district,
      infraction,
      fineAmountBdt: Number(fineAmountBdt) || 0,
      goodsSeizedKg: Number(goodsSeizedKg) || 0,
      shopsSealedCount: Number(shopsSealedCount) || 0,
      raidDate: new Date()
    };

    if (useMemoryFallback) {
      mockDataService.getRaidActions().unshift(newRaid);
      return res.json({ success: true, data: newRaid });
    }

    const created = await RaidAction.create(newRaid);
    res.json({ success: true, data: created });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAuditLogs = async (req, res) => {
  try {
    const { useMemoryFallback } = getDbStatus();
    let logs;
    if (useMemoryFallback) {
      logs = mockDataService.getAuditLogs();
    } else {
      logs = await AuditLog.find().sort({ timestamp: -1 });
      if (!logs || logs.length === 0) logs = mockDataService.getAuditLogs();
    }
    res.json({ success: true, count: logs.length, data: logs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBulletins = async (req, res) => {
  res.json({ success: true, data: activeBulletins });
};

exports.publishBulletin = async (req, res) => {
  try {
    const { title, titleBn, severity = 'HIGH', directive } = req.body;
    const newBulletin = {
      id: `b_${Date.now()}`,
      title,
      titleBn: titleBn || title,
      severity,
      directive,
      issuedAt: new Date().toISOString()
    };
    activeBulletins.unshift(newBulletin);
    res.json({ success: true, message: 'Price bulletin published live', data: newBulletin });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
