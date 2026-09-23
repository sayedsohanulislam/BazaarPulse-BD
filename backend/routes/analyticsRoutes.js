const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/agro-forex', analyticsController.getAgroForex);
router.get('/market-spread', analyticsController.getMarketSpread);
router.post('/family-budget', analyticsController.calcBudget);
router.get('/ramadan-iftar', analyticsController.calcIftarBasket);

module.exports = router;
