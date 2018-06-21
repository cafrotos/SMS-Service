const db = require('../../../models');
const ResponeClient = require('./SpeedSMSClient')
class SpeedSMSService {

    constructor(name){
        this.instance = name;
        this.token = '';
        this.enable = false;
    }

    static getInstance(){
        if(!SpeedSMSService.instance){
            SpeedSMSService.instance = new SpeedSMSService('SpeedSMS');
        }

        return SpeedSMSService.instance;
    }

    async getIntegrationInfo(){
        await db.integration.findOne({where:{name: this.instance}})
            .then(info => {
                this.token = info.dataValues.token;
                this.enable = info.dataValues.enable;
            })
    }

    async sendAllSMS(smsInfo, brandName = ''){
        
        await this.getIntegrationInfo();

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
        console.log(respone);
        return respone.data.tranId;

    }

    async checkStatusSMS(tranID){
        await this.getIntegrationInfo()

        let url = 'sms/status/' + tranID;
        let method = 'GET';

        let status;
        try{
            status = await ResponeClient.getInstance().requestToAPI(url, method, '', this.token);
        }catch(err){
            console.log(err);
        }

        return status.data[0].status;
    }
}


module.exports = SpeedSMSService