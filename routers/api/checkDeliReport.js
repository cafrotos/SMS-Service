const deliReportValidation = require('../validation/deliReportValidation');
const router = require('express').Router();
const createErr = require('http-errors');
const evenEmitter = require('../../scr/lib/EvenEmiter')
const constants = require('../../scr/smsListener/constants')
const bodyParser = require('body-parser');


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }));


router.get('/status', (req, res) => {
    res.send('Hế lô');
})

router.post('/status', (req, res, next) => {
    // if(!deliReportValidation(req.body)){
    //     let err = new createErr(400, "Có điều gì không ổn");
    //     next(err);
    // }


    let data = req.body;
    data.tranId = data.tranId + '';
    console.log(data);

    let events = evenEmitter.getInstance();
    events.emit(constants.SMS_SENT, data);

    res.status(200).json(data);
})

module.exports = router;