const constants = require('./constants');
const evenEmitter = require('../lib/EvenEmiter');
const ManagerSMS = require('../lib/SMSManager');
const db = require('../../models');

let Events = evenEmitter.getInstance();


//gửi sms
Events.on(constants.SMS_CREATE, async (smsInfo) => {
    let data = await ManagerSMS.getInstance().sendSMS(smsInfo)
    console.log(data);
    
    ManagerSMS.getInstance().updateSMSinDB(data);
})
