'use strict'

const rq = require('request-promise');

class BaseClient {

    constructor(baseUrl) {
        if (baseUrl) {
            this._baseUrl = baseUrl;
        }
    }

    async requestToAPI(url, method, data, accessToken) {
        if (/^\/\//.test(url)) {
            url = 'https:' + url;
        }

        if (/^http/.test(url)) {
            //this is valid url
        }
        else {
            url = this._baseUrl + url;
        }

        if (method != 'GET') {
            var options = this.getRestfulRequestOptions(method, url, data, accessToken);
        }
        else {
            var options = this.getRestfulRequestOptions(method, url, '', accessToken);
        }

        //console.log(options);

        return await rq(options).then(res => res);
        // return options;
    }

    static getInstance(baseUrl = null) {
        if (!BaseClient._instances) {
            BaseClient._instances = new this(baseUrl);
        }
        return BaseClient._instances;
    }

    getRestfulRequestOptions(method, url, data, token) {
        let body;
        if (typeof data === 'string') body = JSON.stringify(data);
        else body = data;

        let options = {
            method: method,
            uri: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body,
            json: true // Automatically stringifies the body to JSON
        }
        return options;
    }
}

module.exports = BaseClient;