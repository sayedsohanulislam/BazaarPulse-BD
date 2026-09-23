const express = require('express');
const router = express.Router();
const whistleController = require('../controllers/whistleController');

router.post('/report', whistleController.submitReport);
router.get('/reports', whistleController.getReports);
router.put('/reports/:id/status', whistleController.updateStatus);

module.exports = router;
