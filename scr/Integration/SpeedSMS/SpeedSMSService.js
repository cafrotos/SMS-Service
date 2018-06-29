'use strict'

const ResponeClient = require('./SpeedSMSClient');
const BaseIntegration = require('../../lib/Basic/BaseIntegration');
const path = require('./path');
const TypeofSMS = require('../../lib/SMSManager/TypeofSMS')

class SpeedSMSService extends BaseIntegration {

    static async getInstance() {
        if (!SpeedSMSService.instance) {
            SpeedSMSService.instance = new SpeedSMSService('SpeedSMS');
            
            if (!SpeedSMSService.instance.token || !SpeedSMSService.instance.enable)
                await SpeedSMSService.instance.getIntegration();

        }

        return SpeedSMSService.instance;
    }

    async sendAllSMS(smsInfo, brandName = '') {

        if(!SpeedSMSService.enable){
            console.log('Đối tác không còn hoạt động');
            throw Error('This Integration not enable');
        }

        if (smsInfo.type === TypeofSMS.BRANDNAME && !brandName) {
            brandName = smsInfo.sender;
        }

        let url = path.SEND_SMS;
        let method = 'POST';

        let data = {
            to: [smsInfo.phone],
            content: smsInfo.contents,
            sms_type: smsInfo.type,
            brandname: brandName
        }

        let respone;

        try {
            respone = await ResponeClient.getInstance().requestToAPI(url, method, data, SpeedSMSService.token);
        } catch (err) {
            console.log(err);
            return null;
        };

        return respone;
    }

}

module.exports = SpeedSMSService;