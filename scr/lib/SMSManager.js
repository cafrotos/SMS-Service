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

        let data = {
            id: '',
            tranID: ''
        };

        //create len database
        db.sms_data.create({
            sender: smsInfo.sender,
            shop_receiver: smsInfo.shop_receiver,
            contents: smsInfo.contents,
            phone: smsInfo.phone
          })
          .then(res => {
                data.id = res.dataValues.id;
                //console.log(data.id);
          })
          .catch(err => console.log(err));

        //gửi sang SpeedSMS
        data.tranID = await SpeedSMSService.getInstance().sendAllSMS(smsInfo);
        
        // console.log(data.tranID);
        return data;
    }

    async updateSMSinDB(data){
        let status = await SpeedSMSService.getInstance().checkStatusSMS(data.tranID);
        if(status == 1) status = true;
        else status = false;

        console.log(status);

        db.sms_data.findById(data.id)
            .then((res) => {
                if(res){
                    let newSMS = {is_sent: status};
                    res.updateAttributes(newSMS);
                    console.log('Update thành công')
                }
            })
    }
}
module.exports = SMSManage;