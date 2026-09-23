const WhistleReport = require('../models/WhistleReport');
const mockDataService = require('../services/mockDataService');
const { getDbStatus } = require('../config/db');

exports.submitReport = async (req, res) => {
  try {
    const { 
      marketName, district, shopNumberOrSeller, violationType,
      commodityInvolved, chargedPrice, governmentCapPrice,
      evidenceReceiptUrl, gpsCoordinates, reporterPhone, isAnonymous 
    } = req.body;

    const overcharge = Math.max(0, chargedPrice - governmentCapPrice);
    const overchargeMarginPct = governmentCapPrice > 0 ? Number(((overcharge / governmentCapPrice) * 100).toFixed(1)) : 0;
    const token = `BZ-REP-${Math.floor(10000 + Math.random() * 90000)}`;

    const { useMemoryFallback } = getDbStatus();
    if (useMemoryFallback) {
      const newRep = mockDataService.addWhistleReport({
        trackingToken: token,
        marketName, district, shopNumberOrSeller, violationType,
        commodityInvolved, chargedPrice, governmentCapPrice, overchargeMarginPct,
        evidenceReceiptUrl, gpsCoordinates, reporterPhone, isAnonymous
      });
      return res.json({ success: true, message: 'Complaint submitted successfully', data: newRep });
    }

    const created = await WhistleReport.create({
      trackingToken: token,
      marketName, district, shopNumberOrSeller, violationType,
      commodityInvolved, chargedPrice, governmentCapPrice, overchargeMarginPct,
      evidenceReceiptUrl, gpsCoordinates, reporterPhone, isAnonymous
    });

    res.json({ success: true, message: 'Complaint submitted successfully', data: created });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    const { status, search } = req.query;
    const { useMemoryFallback } = getDbStatus();

    let reports;
    if (useMemoryFallback) {
      reports = mockDataService.getWhistleReports();
    } else {
      reports = await WhistleReport.find().sort({ createdAt: -1 });
      if (!reports || reports.length === 0) reports = mockDataService.getWhistleReports();
    }

    if (status && status !== 'ALL') {
      reports = reports.filter(r => r.status === status);
    }

    if (search) {
      const q = search.toLowerCase();
      reports = reports.filter(r => 
        (r.trackingToken || '').toLowerCase().includes(q) ||
        (r.marketName || '').toLowerCase().includes(q) ||
        (r.commodityInvolved || '').toLowerCase().includes(q)
      );
    }

    res.json({ success: true, count: reports.length, data: reports });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, actionTakenNotes } = req.body;
    const { useMemoryFallback } = getDbStatus();

    if (useMemoryFallback) {
      const updated = mockDataService.updateReportStatus(id, status, actionTakenNotes);
      if (updated) return res.json({ success: true, data: updated });
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    const updated = await WhistleReport.findByIdAndUpdate(
      id,
      { status, actionTakenNotes },
      { new: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
