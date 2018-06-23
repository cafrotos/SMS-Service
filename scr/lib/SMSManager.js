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

        //giả lập đã gửi thành công vs mã tranId = 1235;
        //let tranId = '1235';


        if(!tranId){
            return null;
        }

        //create len database
        db.sms_data.create({
            tranid: tranId,
            sender: smsInfo.sender,
            shop_receiver: smsInfo.shop_receiver,
            contents: smsInfo.contents,
            phone: smsInfo.phone,
            is_sent: false
          })
          .then()
          .catch(err => console.log(err));
        
    }

    async updateSMSinDB(data){

        if(data.status == 0) data.status = true;
        else data.status = false;
        console.log(data);

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


module.exports = SMSManage;