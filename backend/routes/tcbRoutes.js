const express = require('express');
const router = express.Router();
const tcbController = require('../controllers/tcbController');

router.get('/trucks', tcbController.getTrucks);
router.put('/trucks/:id', tcbController.updateStock);

module.exports = router;
