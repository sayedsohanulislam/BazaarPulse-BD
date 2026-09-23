const TcbTruck = require('../models/TcbTruck');
const mockDataService = require('../services/mockDataService');
const { getDbStatus } = require('../config/db');

exports.getTrucks = async (req, res) => {
  try {
    const { useMemoryFallback } = getDbStatus();
    let trucks;
    if (useMemoryFallback) {
      trucks = mockDataService.getTcbTrucks();
    } else {
      trucks = await TcbTruck.find();
      if (!trucks || trucks.length === 0) trucks = mockDataService.getTcbTrucks();
    }

    const { status } = req.query;
    if (status && status !== 'ALL') {
      trucks = trucks.filter(t => t.arrivalStatus === status);
    }

    res.json({ success: true, count: trucks.length, data: trucks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { arrivalStatus, stockLevels } = req.body;
    const { useMemoryFallback } = getDbStatus();

    if (useMemoryFallback) {
      const truck = mockDataService.getTcbTrucks().find(t => t.id === id);
      if (truck) {
        if (arrivalStatus) truck.arrivalStatus = arrivalStatus;
        if (stockLevels) truck.stockLevels = { ...truck.stockLevels, ...stockLevels };
        return res.json({ success: true, data: truck });
      }
      return res.status(404).json({ success: false, message: 'TCB Truck not found' });
    }

    const updated = await TcbTruck.findByIdAndUpdate(
      id,
      { arrivalStatus, stockLevels, lastStockUpdate: Date.now() },
      { new: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
