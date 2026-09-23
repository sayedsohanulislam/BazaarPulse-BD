const express = require('express');
const router = express.Router();
const hoardingController = require('../controllers/hoardingController');

router.get('/cold-storages', hoardingController.getColdStorages);
router.put('/cold-storages/:id', hoardingController.updateInspection);

module.exports = router;
