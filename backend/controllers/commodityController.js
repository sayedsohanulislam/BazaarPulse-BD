const Commodity = require('../models/Commodity');
const mockDataService = require('../services/mockDataService');
const externalAgroService = require('../services/externalAgroService');
const { getDbStatus } = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const { category, search } = req.query;
    const { useMemoryFallback } = getDbStatus();

    let items;
    if (useMemoryFallback) {
      items = mockDataService.getCommodities();
    } else {
      items = await Commodity.find();
      if (!items || items.length === 0) {
        items = mockDataService.getCommodities();
      }
    }

    if (category && category !== 'ALL') {
      items = items.filter(c => c.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      items = items.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.nameBn.includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getLiveTicker = async (req, res) => {
  try {
    const { useMemoryFallback } = getDbStatus();
    let items = useMemoryFallback ? mockDataService.getCommodities() : await Commodity.find();
    if (!items || items.length === 0) items = mockDataService.getCommodities();

    const sortedBySurge = [...items].sort((a, b) => b.deltaPercent - a.deltaPercent);
    const topGainers = sortedBySurge.slice(0, 4);
    const topDecliners = [...items].sort((a, b) => a.deltaPercent - b.deltaPercent).slice(0, 3);
    const highSyndicateRisk = items.filter(i => i.syndicateRiskScore > 70);

    const agroTelemetry = externalAgroService.getCombinedAgroTelemetry();

    res.json({
      success: true,
      data: {
        topGainers,
        topDecliners,
        highSyndicateRiskCount: highSyndicateRisk.length,
        highSyndicateItems: highSyndicateRisk,
        agroTelemetry,
        totalTracked: items.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const { useMemoryFallback } = getDbStatus();
    let item;
    if (useMemoryFallback) {
      item = mockDataService.getCommodities().find(c => c.id === id);
    } else {
      item = await Commodity.findById(id);
    }
    if (!item) return res.status(404).json({ success: false, message: 'Commodity not found' });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.forceSync = async (req, res) => {
  try {
    await Promise.all([
      externalAgroService.fetchLiveForex(),
      externalAgroService.fetchAgroWeather()
    ]);
    const telemetry = externalAgroService.getCombinedAgroTelemetry();
    res.json({
      success: true,
      message: 'Agrometeorological weather and foreign exchange telemetry synced live!',
      data: telemetry
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
