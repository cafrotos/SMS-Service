'use strict'
const IntegrationRepositories = require('../../repositories/IntegrationRepositories');

class BaseIntegration {

    constructor(name) {
        this.name = name;
    }

    async getIntegration() {
        let integration = await IntegrationRepositories.getInstance().getIntegrationByName(this.name);

        BaseIntegration.token = integration.token;
        BaseIntegration.enable = integration.enable;
    }

    /*
    Tạm thời chưa dùng đến

    async addIntegration(data){

        if(!data || !data.name || !data.token || !data.enable){
            console.log("Thiếu thông tin đối tác")
            return null;
        }

        IntegrationRepositories.getInstance().AddObjectToTable(data);
    }

    async updateIntegration(oldname, data){

        if(!data || !oldname || !data.name || !data.token || !data.enable){
            console.log("Thiếu thông tin đối tác cập nhật");
            return null;
        }
        
        
        IntegrationRepositories.getInstance().UpdateIntegrationByName(oldname, data)
    }
    */

}


module.exports = BaseIntegration;