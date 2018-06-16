const router = require('express').Router();

router.get('/', require('./api/index'));
router.get('/sms', require('./api/Sms'));
router.post('/sms', require('./api/Sms'));

module.exports = router;