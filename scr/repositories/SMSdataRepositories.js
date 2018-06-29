'use strict'

const db = require('../../models');
let BasicRepositories = require('../lib/Basic/BasicRepositories');

class SMSdataRepositories extends BasicRepositories {
    constructor() {
        super(db.sms_data);
    }

    static getInstance() {
        if (!SMSdataRepositories.instance) {
            SMSdataRepositories.instance = new SMSdataRepositories;
        }

        return SMSdataRepositories.instance;
    }

    async updateStatusSmsWithTranId(tranId, status) {
        return await this.tableName.findOne({
            where: {
                tranid: tranId
            }
        }).then(smsData => {
            if (smsData) {
                console.log("Update thành công!")
                let newSMS = {status: status };
                smsData.updateAttributes(newSMS);
            }
        })
    }
}


module.exports = SMSdataRepositories;