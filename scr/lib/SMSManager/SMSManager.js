'use strict'

const SpeedSMSService = require('../../Integration/SpeedSMS/SpeedSMSService');
const db = require('../../../models');
const SmsDataRepositories = require('../../repositories/SMSdataRepositories');
const Logger = require('../../lib/Logger');
const StatusSMS = require('./StatusSMS')

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

        try {
            let service = await SpeedSMSService.getInstance();
            service.sendAllSMS(smsInfo, "").then(Response => {
                let smsUpdate = {
                    tranid: '',
                    status: ''
                }

                if (Response.status === StatusSMS.ERROR) {
                    smsUpdate.tranid = null;
                    smsUpdate.status = Response.status;
                }
                else {
                    smsUpdate.tranid = Response.data.tranId;
                    smsUpdate.status = Response.status;
                }

                let logger = Logger.factory('info');
                logger.info('Respone call API SpeedSMS: ' + JSON.stringify(Response));


                //update status after send to speed sms in database
                /***************
                 * Có 6 trạng thái gửi tin nhắn:
                 *     1. created: đã tạo dữ liệu tin nhắn trên database;
                 *     1. success: chuyển thành công lên speedsms;
                 *     2. error: chuyển lên speedsms thất bại;
                 *     3. sent: đã gửi tới sđt cần gửi;
                 *     4. temporary fail: tạm thời không gửi được;
                 *     5. false: Không gửi được tin nhắn
                 **************/

                SmsDataRepositories.getInstance().updateObjectToTableById(smsInfo.id, smsUpdate);
            });
        }
        catch (err) {
            let logger = Logger.factory('errors');
            logger.error('ERRORS: ' + err);

            return null;
        }
    }

    async updateFinalyStatusSMSinDB(data) {

        if (data.status == 0) data.status = StatusSMS.SENT;
        else if (data.status > 0 && data.status < 64) data.status = StatusSMS.TEMPORARY_FAIL;
        else data.status = StatusSMS.FAIL;

        //Update status sms in SpeedSMS to database
        SmsDataRepositories.getInstance().updateStatusSmsWithTranId(data.tranId, data.status);

        let logger = Logger.factory('info');
        logger.info('Status SMS in SpeedSMS: ' + JSON.stringify(data));
    }
}

module.exports = SMSManager;