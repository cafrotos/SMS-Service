'use strict'

const TypeofSMS = require('../../scr/lib/SMSManager/TypeofSMS');

var smsValidation = (smsInfo) => {
    if(!smsInfo || !smsInfo.sender || !smsInfo.shop_receiver || !smsInfo.contents || smsInfo.phone.length === 0)
        return false;
    else return true;

    if(!smsInfo.type || smsInfo.type !== TypeofSMS.QC || smsInfo.type !== TypeofSMS.CSKH || smsInfo.type !== TypeofSMS.CONST_NUMBER || smsInfo.type !== TypeofSMS.BRANDNAME || smsInfo.type !== TypeofSMS.FIX_NUMBER)
        return false;
    else return true
}

module.exports = smsValidation;