'use strict'

const ResponeClient = require('./SpeedSMSClient');
const BaseIntegration = require('../../lib/Basic/BaseIntegration');
const path = require('./path');

class SpeedSMSService extends BaseIntegration {

    static getInstance() {
        if (!SpeedSMSService.instance) {
            SpeedSMSService.instance = new SpeedSMSService('SpeedSMS');
        }

        return SpeedSMSService.instance;
    }

    async sendAllSMS(smsInfo, brandName = '') {

        if (!SpeedSMSService.token) await this.getIntegration();

        if (smsInfo.type === '3' && !brandName) {
            brandName = smsInfo.sender;
        }

        let url = path.SEND_SMS;
        let method = 'POST';

        let data = {
            to: smsInfo.phone,
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