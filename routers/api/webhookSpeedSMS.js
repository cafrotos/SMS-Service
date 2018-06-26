'use strict'

const deliReportValidation = require('../validation/webhookValidation');
const router = require('express').Router();
const createErr = require('http-errors');
const evenEmitter = require('../../scr/lib/EvenEmiter')
const constants = require('../../scr/smsListener/constants')
const bodyParser = require('body-parser');


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }));


router.get('/webhook', (req, res) => {
    res.send('Hế lô');
})

router.post('/webhook', (req, res, next) => {
    // if(!deliReportValidation(req.body)){
    //     let err = new createErr(400, "Có điều gì không ổn");
    //     next(err);
    // }
    let data = req.body;
    
    data.tranId = data.tranId + '';
    console.log();

    let events = evenEmitter.getInstance();
    events.emit(constants.SMS_UPDATE, data);

    res.status(200).json(data);
})

module.exports = router;