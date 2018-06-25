'use strict'

const smsValidation = require('../validation/smsValidation');
const senderValidation = require('../validation/senderValidation');
const deliReportValidation = require('../validation/webhookValidation');
const router = require('express').Router();
const db = require('../../models');
const bodyParser = require('body-parser');
const createErr = require('http-errors');
const evenEmitter = require('../../scr/lib/EvenEmiter')
const constants = require('../../scr/smsListener/constants')
const sequelize = require('sequelize');


router.get('/sms', (req, res, next) => {
    res.status(200).send('Send your sms');
})

router.post('/sms', async (req, res, next) => {
    let smsInfo = req.body.smsInfo;
    let token = req.get('token');
    
    if(typeof smsInfo === "string") smsInfo = JSON.parse(smsInfo);
    
    smsInfo.sender = await senderValidation.getInstance().Validation(token);
    //console.log(smsInfo.sender);

    if(!smsValidation(smsInfo)){
        let err = new createErr(400, "Thông tin gửi SMS không đúng");
        next(err);
    }

    else if(smsInfo.type < 1 || (smsInfo.type > 4 && smsInfo.type != 6)) {
        let err = new createErr(400, "Loại tin nhắn không chính xác")
        next(err);
    }

    else {
        let event = evenEmitter.getInstance();

        smsInfo = await db.sms_data.create({
            tranid: '00000',
            sender: smsInfo.sender,
            shop_receiver: smsInfo.shop_receiver,
            contents: smsInfo.contents,
            phone: smsInfo.phone,
            is_sent: "Đã tạo"
        })
        .then((res) =>  res.dataValues)
        .catch((err) => {
            res.status(400).json(err);
        });  
        
        event.emit(constants.SMS_CREATE, smsInfo);
        res.status(200).json(smsInfo);
    }
})


module.exports = router;