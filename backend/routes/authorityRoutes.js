const express = require('express');
const router = express.Router();
const authorityController = require('../controllers/authorityController');

router.get('/raids', authorityController.getRaids);
router.post('/raids', authorityController.logRaid);
router.get('/audit-logs', authorityController.getAuditLogs);
router.get('/bulletins', authorityController.getBulletins);
router.post('/bulletins', authorityController.publishBulletin);

module.exports = router;
