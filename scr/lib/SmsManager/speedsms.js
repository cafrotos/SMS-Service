const request = require('request');
const integration = require('../../Integration/BaseIntegration')

class SpeedSMS{

    constructor(smsInfo){
        this.smsInfo = smsInfo;
        this.token = '';
    }

    async SendSMS(){
        this.token = await integration.getIntegration('SpeedSMS')
        if(!this.token) {
            console.log("Không thể gửi");
            return null;
        }

        var params = JSON.stringify({
            to: [this.smsInfo.phone],
            content: this.smsInfo.contents,
            sms_type: this.smsInfo.type,
            sender: this.smsInfo.sender
        });

        let buf = new Buffer(this.token + ':x')
        let auth = 'Basic ' + buf.toString('base64');

        let options = {
            url: 'https://api.speedsms.vn/index.php/sms/send',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
            },
            form: params
        };
        
        return request.post(options, (err, res, body) => {
            body = JSON.parse(body);
            if(body.status === "success"){
                console.log("Đã chuyển lên SpeedSMS");
                console.log(body.data.tranId);
                return body.data.tranId + '';
            }
            else {
                console.log("ERRORS: ")
                console.log(body.message);
            }
        })
        
    }

    getStatusSMS(tranID){
        if(!tranID) return false;
        
        let buf = new Buffer(this.token + ':x')
        let auth = 'Basic ' + buf.toString('base64');

        let options = {
            url: 'https://api.speedsms.vn/index.php/sms/status' + tranID,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
            }
        };

        return request.get(options, (err, res, body) => {
            let status;

            if(body.status == 1) status = true;
            else status = false;

            return status;
        })
    }
} 

module.exports = SpeedSMS;