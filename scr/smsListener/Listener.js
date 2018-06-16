const constants = require('./constants');
const evenEmitter = require('../lib/EvenEmiter');
const sendSMS = require('../lib/SpeedSMS');

let Events = evenEmitter.getInstance();

Events.on(constants.SMS_SENT, (smsInfo) => {
    let phone = [];
    phone.push(smsInfo.phone);
    let content = smsInfo.contents;
    let type = 2;
    let sender = '';
    sendSMS(phone, content, type, sender);
})


