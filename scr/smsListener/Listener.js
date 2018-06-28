'use strict'

const constants = require('./constants');
const evenEmitter = require('../lib/EvenEmiter');
const ManagerSMS = require('../lib/SMSManager');
const db = require('../../models');

let Events = evenEmitter.getInstance();


//gửi sms
Events.on(constants.SMS_SENDING, (smsInfo) => {
    try {
        ManagerSMS.getInstance().sendSMS(smsInfo)
    } catch (error) {
        console.log(error);
    }
    console.log();
})

//cập nhật trạng thái tin nhắn trên speedsms lên database
Events.on(constants.SMS_UPDATE, (data) => {
    console.log();
    ManagerSMS.getInstance().updateFinalyStatusSMSinDB(data);

})
