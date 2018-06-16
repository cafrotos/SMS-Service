var errors = require('http-errors')
var smsValidation = (smsInfo) => {
    if(!smsInfo || !smsInfo.sender || !smsInfo.shop_receiver || !smsInfo.contents || !smsInfo.phone)
        return false;
    else return true;
}

module.exports = smsValidation;