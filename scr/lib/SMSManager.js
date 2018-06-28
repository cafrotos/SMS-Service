'use strict'

const SpeedSMSService = require('../Integration/SpeedSMS/SpeedSMSService');
const db = require('../../models');
const SmsDataRepositories = require('../repositories/SMSdataRepositories');
const Logger = require('../lib/Logger');

class SMSManager {
    constructor(name) {
        this.name = name;
    }

    static getInstance() {
        if (!SMSManager.instance) {
            SMSManager.instance = new SMSManager('SMSManager');
        }
        return SMSManager.instance;
    }

    async sendSMS(smsInfo) {

        //gửi sang SpeedSMS
        let Response = await SpeedSMSService.getInstance().sendAllSMS(smsInfo);

        if (Response.status === SMSManager.SMS_STATUS.ERROR) {
            Response.data.tranId = null;
        }

        let smsUpdate = {
            tranid: Response.data.tranId,
            is_sent: Response.status
        }

        let logger = Logger.factory('info');
        logger.info('Respone call API SpeedSMS: ' + JSON.stringify(Response));

        //update status after send to speed sms in database
        /***************
         * Có 5 trạng thái gửi tin nhắn:
         *     1. success: chuyển thành công lên speedsms;
         *     2. error: chuyển lên speedsms thất bại;
         *     3. sent: đã gửi tới sđt cần gửi;
         *     4. temporary fail: tạm thời không gửi được;
         *     5. false: Không gửi được tin nhắn
         **************/

        SmsDataRepositories.getInstance().UpdateObjectToTableById(smsInfo.id, smsUpdate);
    }

    async updateFinalyStatusSMSinDB(data) {

        if (data.status == 0) data.status = SMSManager.SMS_STATUS.SENT;
        else if (data.status > 0 && data.status < 64) data.status = SMSManager.SMS_STATUS.TEMPORARY_FAIL;
        else data.status = SMSManager.SMS_STATUS.FAIL;

        //Update status sms in SpeedSMS to database
        SmsDataRepositories.getInstance().UpdateStatusSmsWithTranId(data.tranId, data.status);

        let logger = Logger.factory('info');
        logger.info('Status SMS in SpeedSMS: ' + JSON.stringify(data));
    }
}

SMSManager.SMS_STATUS = {
    SUCCESS: "sucess",
    ERROR: "error",
    SENT: "sent",
    TEMPORARY_FAIL: "temporary_fail",
    FAIL: "fail"
}

module.exports = SMSManager;