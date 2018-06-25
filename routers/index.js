'use strict'

const router = require('express').Router();

router.get('/', require('./api/index'));
router.get('/sms', require('./api/Sms'));
router.post('/sms', require('./api/Sms'));
router.post('/webhook', require('./api/webhookSpeedSMS'));
router.get('/webhook', require('./api/webhookSpeedSMS'));

module.exports = router;