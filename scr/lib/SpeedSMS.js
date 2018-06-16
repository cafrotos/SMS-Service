var error = require('http-errors');
var http = require('http');
var https = require('https');
const ACCESS_TOKEN = "iqPsZBiS8v4NutOK1Bkg3lljzCSAx_O8";
var status = false;

const sendSMS = function(phones, content, type, sender) {
    var url = 'api.speedsms.vn';
    var params = JSON.stringify({
        to: phones,
        content: content,
        sms_type: type,
        sender: sender
    });

    var buf = new Buffer(ACCESS_TOKEN + ':x');
    var auth = "Basic " + buf.toString('base64');
    const options = {
        hostname: url,
        port: 443,
        path: '/index.php/sms/send',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth
        }
    };

    const req = https.request(options, function(res) {
        res.setEncoding('utf8');
        var body = '';
        res.on('data', function(d) {
            body += d;
        });
        res.on('end', function() {
            var json = JSON.parse(body);
            if (json.status == 'success') {
                console.log("send sms success")
                status = true;
            }
            else {
                console.log("send sms failed " + body);
                
            }
        });
    });

    req.on('error', function(e) {
        console.log("send sms failed: " + e);
        e = JSON.parse(e);
        
    });

    req.write(params);
    req.end();

    req.write()
    
}

module.exports = sendSMS;