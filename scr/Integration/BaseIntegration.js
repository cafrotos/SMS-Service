'use strict'

const db = require('../../models');

class BaseIntegration {

    constructor(name){
        this.name = name;
    }

    async getIntegration(){
        await db.integration.findOne({where:{name: this.name}})
            .then(info => {
                BaseIntegration.token = info.dataValues.token;
                BaseIntegration.enable = info.dataValues.enable;
            })
    }

    async addIntegration(data){

        if(!data || !data.name || !data.token || !data.enable){
            console.log("Thiếu thông tin đối tác")
            return null;
        }

        db.integration.create({
            name: data.name,
            token: data.token,
            enable: data.enable
        })
        .then(res => {
            console.log('Thêm thành công đối tác: ');
            console.log(res.dataValues);
        })
        .catch(err => console.log(err));
    }

    async updateIntegration(data){

        if(!data || !data.oldname || !data.name || !data.token || !data.enable){
            console.log("Thiếu thông tin đối tác cập nhật");
            return null;
        }
        
        db.findOne({where: {name: data.oldname}})
            .then(integration => {
                if(integration){
                    let newData = {
                        name: data.name,
                        token: data.token,
                        enable: data.enable
                    }
                    integration.updateAttributes(newData);
                }
            })
            .catch(err => console.log(err));
    }

}

BaseIntegration.token = '';
BaseIntegration.instance = '';
BaseIntegration.enable = null;

module.exports = BaseIntegration