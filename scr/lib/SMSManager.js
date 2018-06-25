'use strict'

const SpeedSMSService = require('../Integration/SpeedSMS/SpeedSMSService');
const db = require('../../models');
class SMSManage{
    constructor(provider){
        this.provider = [];
        this.provider.push(provider);
    }

    static getInstance(){
        if(!SMSManage.instance){
            SMSManage.instance = new SMSManage('SpeedSMS');
        }
        return SMSManage.instance;
    }

    async sendSMS(smsInfo){
        if(this.provider.length == 0){
            throw Error("Thiếu thông tin đối tác")
        }

        //gửi sang SpeedSMS
        let tranId = await SpeedSMSService.getInstance().sendAllSMS(smsInfo);
        let status = 'Đang gửi';

        //giả lập đã gửi thành công vs mã tranId = 1235;
        //let tranId = '1235';


        if(!tranId){
            tranId = null;
            status = "Không gửi được"
        }

        //update in database
        db.sms_data.findById(smsInfo.id)
            .then((res) => {
                if(res){
                    let newSMS = {tranid: tranId, is_sent: status};
                    res.updateAttributes(newSMS);
                }
            })
            .catch(err => console.log(err));
        
    }

    async updateSMSinDB(data){
    
        if(data.status == 0) data.status = 'Đã gửi';
        else if(data.status > 0 && data.status < 64) data.status = 'Tạm thời thất bại';
        else data.status = "Gửi thất bại" 

        db.sms_data.findOne({where: {tranid: data.tranId}})
            .then((res) => {
                if(res){
                    let newSMS = {is_sent: data.status};
                    res.updateAttributes(newSMS);
                }
            })
            .catch(err => console.log(err));
    }
}

SMSManage.instance = null


module.exports = SMSManage;