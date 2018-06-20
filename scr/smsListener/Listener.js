const constants = require('./constants');
const evenEmitter = require('../lib/EvenEmiter');
const ManagerSMS = require('../lib/SmsManager/SmsManager');
const db = require('../../models');

let Events = evenEmitter.getInstance();


//gửi sms
Events.on(constants.SMS_CREATE, async (smsInfo) => {
    let status = await ManagerSMS.getServiceAndSendSMS(smsInfo);
    
    // sau khi gửi xong cập nhật luôn trạng thái tin nhắn trên database
    db.sms_data.findById(smsInfo.id)
            .then((sms) => {
                if (sms) {
                    let newsms = {is_sent: status};
                    sms.updateAttributes(newsms);
                }
            }).catch((err) => {
                console.info(err);
            })
})
