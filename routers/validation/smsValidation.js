'use strict'

var smsValidation = (smsInfo) => {
    if(!smsInfo || !smsInfo.sender || !smsInfo.shop_receiver || !smsInfo.contents || !smsInfo.phone || smsInfo.phone.length == 0)
        return false;
    else return true;
}

module.exports = smsValidation;