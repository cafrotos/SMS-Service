const router = require('express').Router();

router.get('/', require('./api/index'));
router.get('/sms', require('./api/Sms'));
router.post('/sms', require('./api/Sms'));
router.post('/status', require('./api/checkDeliReport'));
router.get('/status', require('./api/checkDeliReport'));

module.exports = router;