const smsValidation = require('../validation/smsValidation');
const senderValidation = require('../validation/senderValidation');
const router = require('express').Router();
const db = require('../../models');
const bodyParser = require('body-parser');
const createErr = require('http-errors');
const evenEmitter = require('../../scr/lib/EvenEmiter')
const constants = require('../../scr/smsListener/constants')
const sequelize = require('sequelize');


router.get('/', (req, res, next) => {
    res.send('Welcome');
})

router.get('/sms', (req, res, next) => {
    res.send('Send your sms');
})

router.post('/sms', (req, res, next) => {
    let smsInfo = req.body.smsInfo;
    let token = req.get('token');
    
    if(typeof smsInfo === "string") smsInfo = JSON.parse(smsInfo);
    
    smsInfo.sender = senderValidation(token);

    if(!smsValidation(smsInfo)){
        let err = new createErr(400, "Thông tin gửi SMS không đúng");
        next(err);
    }

    else {
        let event = evenEmitter.getInstance();

        db.smsdata.create(smsInfo)
        .then(sms => {
            console.log("Tin nhắn đang được gửi...")
            event.emit(constants.SMS_SENT, smsInfo);
            res.status(200).json(smsInfo);
        })
        .catch(err => {
            next(err);
        });
    }
})

module.exports = router;