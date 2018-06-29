'use strict'

const smsValidation = require('../validation/smsValidation');
const deliReportValidation = require('../validation/webhookValidation');
const router = require('express').Router();
const db = require('../../models');
const bodyParser = require('body-parser');
const createErr = require('http-errors');
const evenEmitter = require('../../scr/lib/EvenEmiter');
const constants = require('../../scr/smsListener/constants');
const SmsDataRepositories = require('../../scr/repositories/SMSdataRepositories');
const StatusSMS = require('../../scr/lib/SMSManager/StatusSMS');


router.get('/sms', (req, res, next) => {
    res.status(200).send('Send your sms');
})

router.post('/sms', async (req, res, next) => {
    let smsInfo = req.body.smsInfo;
    let token = req.get('token');

    if (typeof smsInfo === "string") smsInfo = JSON.parse(smsInfo);

    if (!smsValidation(smsInfo)) {
        let err = new createErr(400, "Thông tin gửi SMS không đúng");
        next(err);
    }

    else {
        let event = evenEmitter.getInstance();
        smsInfo.status = StatusSMS.CREATED;

        SmsDataRepositories.getInstance().addObjectToTable(smsInfo)
            .then(result => {
                event.emit(constants.SMS_SENDING, result);
                res.status(200).json(result);
                
            })
            .catch(err => {
                console.log(err);
                let error = new createErr(500, "Can't create to database");
                next(error);
            })
    }
})


module.exports = router;