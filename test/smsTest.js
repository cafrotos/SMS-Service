const request = require('request');
const expect = require('chai').expect;

describe("Sent sms", () => {
    it("Không thể xác thực.(sai mã token)", () => {
        let smsInfo = {
            phone: "0946669083",
            contents: "abcxyz",
            shop_receiver: "saotruc.vn",
            type:"1"
        }

        let options = {
            url: 'http://localhost:3000/sms',
            headers: {
                'token': 'kajhdsfoi'
            },
            form: smsInfo
        };

        request.post(options, (errors, response, body) => {
            response = response.toJSON();
            expect(response.statusCode).to.equal(400);
            done();
        })
    })

    it("Thông tin gửi SMS không đúng.(sai thuộc tính)", () => {
        let smsInfo = {
            pho: '0946669083',
            contents: 'asdfoi',
            shop_receiver: 'asdg'
        }

        let options = {
            url: 'http://localhost:3000/sms',
            headers: {
                'token': 'qwerty'
            },
            form: smsInfo
        };

        request.post(options, (errors, response, body) => {
            response = response.toJSON();
            expect(response.statusCode).to.equal(400);
            done();
        })
        
    })

    it("Thông tin gửi SMS không đúng.(sai thuộc tính)", () => {
        let smsInfo = {
            pho: '0946669083',
            contents: 'asdfoi',
            shop_receiver: ''
        }

        let options = {
            url: 'http://localhost:3000/sms',
            headers: {
                'token': 'qwerty'
            },
            form: smsInfo
        };

        request.post(options, (errors, response, body) => {
            response = response.toJSON();
            expect(response.statusCode).to.equal(400);
            done();
        })
        
    })

    it("Gửi thành công", () => {
        let smsInfo = {
            phone: "0946669083",
            contents: "abcxyz",
            shop_receiver: "saotruc.vn",
            type:"1"
        }

        let options = {
            url: 'http://localhost:3000/sms',
            headers: {
                'token': 'qwerty'
            },
            form: smsInfo
        };

        request.post(options, (errors, response, body) => {
            response = response.toJSON();
            expect(response.statusCode).to.equal(200);
            done();
        })
    })
})