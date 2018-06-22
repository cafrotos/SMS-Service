const ResponeClient = require('./SpeedSMSClient')

class SpeedSMSService extends require('../BaseIntegration') {

    static getInstance(){
        if(!SpeedSMSService.instance){
            SpeedSMSService.instance = new SpeedSMSService('SpeedSMS');
        }

        return SpeedSMSService.instance;
    }

    async sendAllSMS(smsInfo, brandName = ''){
        
        await this.getIntegration();

        if(smsInfo.type == 3 && !brandName){
            brandName = smsInfo.sender;
        }

        let url = 'sms/send';
        let method = 'POST';

        let data = {
            to: [smsInfo.phone],
            content: smsInfo.contents,
            sms_type: smsInfo.type,
            brandname: brandName
        }

        //console.log(data);

        let respone;
        try{
            respone = await ResponeClient.getInstance().requestToAPI(url, method, data, this.token);
        }catch(err){
            console.log(err);
        };

        if(respone.status === 'error'){
            console.log("Lỗi: " + respone.message);
            return null;
        }

        return respone.data.tranId;

    }

}


module.exports = SpeedSMSService