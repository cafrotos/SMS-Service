const request = require('request');
const expect = require('chai').expect;

describe("Sent sms", () => {
    // it("Đã gửi đến SpeedSMS", (done) => {
    //     let smsInfo = {
    //         phone: "0946669083",
    //         contents: "abcxyz",
    //         sender: "ShippoVN",
    //         shop_receiver: "saotruc.vn",
    //         type:"1"
    //     }

    //     let options = {
    //         url: 'http://localhost:8080/sms',
    //         headers: {
    //             'token': 'qwertyuiop'
    //         },
    //         form:{
    //             smsInfo
    //         }
    //     };

    //     request.post(options, (errors, response, body) => {
    //         expect(response.statusCode).to.equal(200);
    //         done()
    //     })
    // })

    it("Không thể xác thực.(sai mã token)", (done) => {
        let smsInfo = {
            phone: "09466690843",
            contents: "abcxyz",
            sender: "ShippoVN",
            shop_receiver: "saotruc.vn",
            type:"1"
        }

        let options = {
            url: 'http://localhost:8080/sms',
            headers: {
                'token': 'qwerstyyurt'
            },
            form:{
                smsInfo
            }
        };

        request.post(options, (errors, response, body) => {
            expect(response.statusCode).to.equal(400);
            done();
        })
    })

    it("Thông tin gửi SMS không đúng.(phone = null)", (done) => {
        let smsInfo = {
            phone: "",
            contents: "abcxyz",
            sender: "ShippoVN",
            shop_receiver: "saotruc.vn",
            type:"1"
        }

        let options = {
            url: 'http://localhost:8080/sms',
            headers: {
                'token': 'qwertyuiop'
            },
            form:{
                smsInfo
            }
        };

        request.post(options, (errors, response, body) => {
            expect(response.statusCode).to.equal(400);
            done();
        })
        
    })

    it("Thông tin gửi SMS không đúng.(contents = null)", (done) => {
        let smsInfo = {
            phone: "0946669083",
            contents: "",
            sender: "ShippoVN",
            shop_receiver: "saotruc.vn",
            type:"1"
        }

        let options = {
            url: 'http://localhost:8080/sms',
            headers: {
                'token': 'qwertyuiop'
            },
            form:{
                smsInfo
            }
        };

        request.post(options, (errors, response, body) => {
            expect(response.statusCode).to.equal(400);
            done();
        })
        
    })

    it("Thông tin gửi SMS không đúng.(shop_receiver = null)", (done) => {
        let smsInfo = {
            phone: "0946669083",
            contents: "abcxyz",
            sender: "ShippoVN",
            shop_receiver: "",
            type:"1"
        }

        let options = {
            url: 'http://localhost:8080/sms',
            headers: {
                'token': 'qwertyuiop'
            },
            form:{
                smsInfo
            }
        };

        request.post(options, (errors, response, body) => {
            expect(response.statusCode).to.equal(400);
            done();
        })
        
    })

    it("Thông tin gửi SMS không đúng.(type = null)", (done) => {
        let smsInfo = {
            phone: "0946669083",
            contents: "abcxyz",
            sender: "ShippoVN",
            shop_receiver: "saotruc.vn",
            type:""
        }

        let options = {
            url: 'http://localhost:8080/sms',
            headers: {
                'token': 'qwertyuiop'
            },
            form:{
                smsInfo
            }
        };

        request.post(options, (errors, response, body) => {
            expect(response.statusCode).to.equal(400);
            done();
        })
        
    })

    it("Thông tin gửi SMS không đúng.(type < 1)", (done) => {
        let smsInfo = {
            phone: "0946669083",
            contents: "abcxyz",
            sender: "ShippoVN",
            shop_receiver: "saotruc.vn",
            type:"-1"
        }

        let options = {
            url: 'http://localhost:8080/sms',
            headers: {
                'token': 'qwertyuiop'
            },
            form:{
                smsInfo
            }
        };

        request.post(options, (errors, response, body) => {
            expect(response.statusCode).to.equal(400);
            done();
        })
        
    })

    it("Thông tin gửi SMS không đúng.(type > 4 && type != 6)", (done) => {
        let smsInfo = {
            phone: "0946669083",
            contents: "abcxyz",
            sender: "ShippoVN",
            shop_receiver: "saotruc.vn",
            type:"5"
        }

        let options = {
            url: 'http://localhost:8080/sms',
            headers: {
                'token': 'qwertyuiop'
            },
            form:{
                smsInfo
            }
        };

        request.post(options, (errors, response, body) => {
            expect(response.statusCode).to.equal(400);
            done();
        })
        
    })

    it("Thông tin gửi SMS không đúng.(type > 6)", (done) => {
        let smsInfo = {
            phone: "0946669083",
            contents: "abcxyz",
            sender: "ShippoVN",
            shop_receiver: "saotruc.vn",
            type:"6"
        }

        let options = {
            url: 'http://localhost:8080/sms',
            headers: {
                'token': 'qwertyuiop'
            },
            form:{
                smsInfo
            }
        };

        request.post(options, (errors, response, body) => {
            expect(response.statusCode).to.equal(400);
            done();
        })
        
    })

    it("Thông tin gửi SMS có (type = 2)", (done) => {
        let smsInfo = {
            phone: "0946669083",
            contents: "abcxyz",
            sender: "ShippoVN",
            shop_receiver: "saotruc.vn",
            type:"2"
        }

        let options = {
            url: 'http://localhost:8080/sms',
            headers: {
                'token': 'qwertyuiop'
            },
            form:{
                smsInfo
            }
        };

        request.post(options, (errors, response, body) => {
            expect(response.statusCode).to.equal(400);
            done();
        })
        
    })

    it("Thông tin gửi SMS có (type = 6)", (done) => {
        let smsInfo = {
            phone: "0946669083",
            contents: "abcxyz",
            sender: "ShippoVN",
            shop_receiver: "saotruc.vn",
            type:"6"
        }

        let options = {
            url: 'http://localhost:8080/sms',
            headers: {
                'token': 'qwertyuiop'
            },
            form:{
                smsInfo
            }
        };

        request.post(options, (errors, response, body) => {
            expect(response.statusCode).to.equal(400);
            done();
        })
        
    })
})