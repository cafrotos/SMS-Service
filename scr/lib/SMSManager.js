'use strict'

const SpeedSMSService = require('../Integration/SpeedSMS/SpeedSMSService');
const db = require('../../models');
const SmsDataRepositories = require('../repositories/SMSdataRepositories');

class SMSManager{
    constructor(name){
        SMSManager.instance = name;
    }

    static getInstance(){
        if(!SMSManager.instance){
            SMSManager.instance = new SMSManager('SMSManager');
        }
        return SMSManager.instance;
    }

    async sendSMS(smsInfo){
    
        //gửi sang SpeedSMS
        let tranIdResponse = await SpeedSMSService.getInstance().sendAllSMS(smsInfo);
        let smsUpdate = {
            tranid: tranIdResponse,
            is_sent: 'Đang gửi'
        }

        //giả lập đã gửi thành công vs mã tranId = 1235;
        //let tranId = '1235';

        if(!tranIdResponse){
            smsUpdate.tranid = null;
            smsUpdate.is_sent = "Không gửi được";
        }

        console.log(smsUpdate)

        //update in database
        SmsDataRepositories.getInstance().UpdateObjectToTable(smsInfo.id, smsUpdate);
    }

    async updateSMSinDB(data){
    
        if(data.status == 0) data.status = 'Đã gửi';
        else if(data.status > 0 && data.status < 64) data.status = 'Tạm thời thất bại';
        else data.status = "Gửi thất bại" 

        SmsDataRepositories.getInstance().UpdateStatusSmsWithTranId(data.tranId, data.status);
    }
}

SMSManager.instance = null;


module.exports = SMSManager;