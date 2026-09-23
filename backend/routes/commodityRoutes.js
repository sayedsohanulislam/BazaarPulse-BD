const express = require('express');
const router = express.Router();
const commodityController = require('../controllers/commodityController');

router.get('/', commodityController.getAll);
router.get('/live-ticker', commodityController.getLiveTicker);
router.post('/force-sync', commodityController.forceSync);
router.get('/:id', commodityController.getById);

module.exports = router;
