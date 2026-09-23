const ColdStorage = require('../models/ColdStorage');
const mockDataService = require('../services/mockDataService');
const { getDbStatus } = require('../config/db');

exports.getColdStorages = async (req, res) => {
  try {
    const { district, status } = req.query;
    const { useMemoryFallback } = getDbStatus();

    let list;
    if (useMemoryFallback) {
      list = mockDataService.getColdStorages();
    } else {
      list = await ColdStorage.find();
      if (!list || list.length === 0) list = mockDataService.getColdStorages();
    }

    if (district && district !== 'ALL') {
      list = list.filter(cs => cs.district.toLowerCase() === district.toLowerCase());
    }

    if (status && status !== 'ALL') {
      list = list.filter(cs => cs.inspectionStatus === status);
    }

    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateInspection = async (req, res) => {
  try {
    const { id } = req.params;
    const { inspectionStatus, gateReleasePriceKg } = req.body;
    const { useMemoryFallback } = getDbStatus();

    if (useMemoryFallback) {
      const facility = mockDataService.getColdStorages().find(cs => cs.id === id);
      if (facility) {
        if (inspectionStatus) facility.inspectionStatus = inspectionStatus;
        if (gateReleasePriceKg) facility.gateReleasePriceKg = gateReleasePriceKg;
        return res.json({ success: true, data: facility });
      }
      return res.status(404).json({ success: false, message: 'Facility not found' });
    }

    const updated = await ColdStorage.findByIdAndUpdate(
      id,
      { inspectionStatus, gateReleasePriceKg, lastInspectedAt: Date.now() },
      { new: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
