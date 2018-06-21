const request = require('request');
const expect = require('chai').expect;

describe("Sent sms", () => {
    it("Đã gửi đến SpeedSMS", () => {
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

    it("Không thể xác thực.(sai mã token)", () => {
        let smsInfo = {
            phone: "09466690843",
            contents: "abcxyz",
            shop_receiver: "saotruc.vn",
            type:"1"
        }

        let options = {
            url: 'http://localhost:3000/sms',
            headers: {
                'token': 'qwertyyurt'
            },
            form: smsInfo
        };

        request.post(options, (errors, response, body) => {
            response = response.toJSON();
            expect(response.statusCode).to.equal(400);
            done();
        })
    })

    it("Thông tin gửi SMS không đúng.(phone = null)", () => {
        let smsInfo = {
            phone: "",
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
            expect(response.statusCode).to.equal(400);
            done();
        })
        
    })

    it("Thông tin gửi SMS không đúng.(contents = null)", () => {
        let smsInfo = {
            phone: "0946669083",
            contents: "",
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
            expect(response.statusCode).to.equal(400);
            done();
        })
        
    })

    it("Thông tin gửi SMS không đúng.(shop_receiver = null)", () => {
        let smsInfo = {
            phone: "0946669083",
            contents: "abcxyz",
            shop_receiver: "",
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
            expect(response.statusCode).to.equal(400);
            done();
        })
        
    })

    it("Thông tin gửi SMS không đúng.(type = null)", () => {
        let smsInfo = {
            phone: "0946669083",
            contents: "abcxyz",
            shop_receiver: "saotruc.vn",
            type:""
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

    it("Thông tin gửi SMS không đúng.(type < 1)", () => {
        let smsInfo = {
            phone: "0946669083",
            contents: "abcxyz",
            shop_receiver: "saotruc.vn",
            type:"-1"
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

    it("Thông tin gửi SMS không đúng.(type > 4 && type != 6)", () => {
        let smsInfo = {
            phone: "0946669083",
            contents: "abcxyz",
            shop_receiver: "saotruc.vn",
            type:"5"
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

    it("Thông tin gửi SMS không đúng.(type > 6)", () => {
        let smsInfo = {
            phone: "0946669083",
            contents: "abcxyz",
            shop_receiver: "saotruc.vn",
            type:"6"
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

    it("Thông tin gửi SMS có (type = 2)", () => {
        let smsInfo = {
            phone: "0946669083",
            contents: "abcxyz",
            shop_receiver: "saotruc.vn",
            type:"2"
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

    it("Thông tin gửi SMS có (type = 6)", () => {
        let smsInfo = {
            phone: "0946669083",
            contents: "abcxyz",
            shop_receiver: "saotruc.vn",
            type:"6"
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
})