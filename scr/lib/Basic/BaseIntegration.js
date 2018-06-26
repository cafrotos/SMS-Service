'use strict'
const IntegrationRepositories = require('../../repositories/IntegrationRepositories');

class BaseIntegration {

    constructor(name){
        this.name = name;
    }

    async getIntegration(){
        // await db.integration.findOne({where:{name: this.name}})
        //     .then(info => {
        //         BaseIntegration.token = info.dataValues.token;
        //         BaseIntegration.enable = info.dataValues.enable;
        //     })
        let integration = await IntegrationRepositories.getInstance().getIntegrationByName(this.name);
        BaseIntegration.token = integration.token;
        BaseIntegration.enable = integration.enable;
    }

    async addIntegration(data){

        if(!data || !data.name || !data.token || !data.enable){
            console.log("Thiếu thông tin đối tác")
            return null;
        }

        // db.integration.create({
        //     name: data.name,
        //     token: data.token,
        //     enable: data.enable
        // })
        // .then(res => {
        //     console.log('Thêm thành công đối tác: ');
        //     console.log(res.dataValues);
        // })
        // .catch(err => console.log(err));
        IntegrationRepositories.getInstance().AddObjectToTable(data);
    }

    async updateIntegration(oldname, data){

        if(!data || !oldname || !data.name || !data.token || !data.enable){
            console.log("Thiếu thông tin đối tác cập nhật");
            return null;
        }
        
        
        IntegrationRepositories.getInstance().UpdateIntegrationByName(oldname, data)
    }

}

BaseIntegration.token = '';
BaseIntegration.instance = '';
BaseIntegration.enable = null;

module.exports = BaseIntegration