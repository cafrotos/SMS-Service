'use strict'

const router = require('express').Router();

router.get('/', require('./api/index'));
router.get('/sms', require('./api/Sms'));
router.post('/sms', require('./api/Sms'));
router.post('/webhook', require('./api/webhook'));
router.get('/webhook', require('./api/webhook'));

module.exports = router;