'use strict'

class senderValidation extends require('../../scr/lib/midlleware/token'){
    static getInstance(){
        if(!senderValidation.instance){
            senderValidation.instance = new senderValidation('Shippo');
        }
        return senderValidation.instance;
    }   
    
    async Validation(token){
        if(!senderValidation.sender) await this.getSender();
        for(let i = 0; i < senderValidation.sender.length; i++){
            if(token === senderValidation.sender[i].token) return senderValidation.sender[i].name;
        }
        return false;
    }

}

module.exports = senderValidation