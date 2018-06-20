const integration = require('../../Integration/BaseIntegration');

class SmsManager{

    static async getServiceAndSendSMS(smsInfo){ // trả về trạng thái sms trên service
            //sử dụng config cấu hình cho mỗi sender tương ứng 1 service
            //tạm thời chưa biết dùng :))
        
        let basename = "./speedsms";
        let service = require(basename);

        let SENDER = new service(smsInfo);

        let tranID = await SENDER.SendSMS();
        
        return SENDER.getStatusSMS(tranID);
    }
}

module.exports = SmsManager;