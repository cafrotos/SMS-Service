'use strict'

let BasicClient = require('../../lib/Basic/BasicClient');

class SpeedSMSClient extends BasicClient{
    constructor(){
        super('http://api.speedsms.vn/index.php/');
    
    }

    getRestfulRequestOptions(method, url, data, token){
        let body;
        if(typeof data === 'string') body = JSON.stringify(data);
        else if(data === '') body = undefined;
        else body = data;

        let auth = 'Basic ' + new Buffer(token + ':x').toString('base64');

        let options = {
            method: method,
            uri: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': auth
            },
            body: body,
            json: true // Automatically stringifies the body to JSON
        }
        return options;
    }
}

module.exports = SpeedSMSClient