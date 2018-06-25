'use strict'
let db = require('../../../models');

class tokenSender{
    constructor(name){
        tokenSender.instance = name;
    }

    async getSender(){
        await db.shippo_token.findAll()
            .then(res => {
                let send = [];
                for(let i = 0; i < res.length; i++){
                    let data = {
                        name: res[i].dataValues.name,
                        token: res[i].dataValues.token
                    }
                    send.push(data);
                }
                tokenSender.sender = send;
            })

    }

    addSender(name, token){
        db.shippo_token.create({
            name: name,
            token: token,
            enable: 1
        }).then()
        .catch(err => console.log(err));
    }
}

tokenSender.instance = '';
tokenSender.sender = null;

module.exports = tokenSender