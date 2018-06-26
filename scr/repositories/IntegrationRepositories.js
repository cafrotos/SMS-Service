const db = require('../../models');
let BasicRepositories = require('../lib/Basic/BasicRepositories');

class IntegrationRepositories extends BasicRepositories{
    constructor(){
        super(db.integration);
    }

    static getInstance(){
        if(!IntegrationRepositories.instance){
            IntegrationRepositories.instance = new IntegrationRepositories;
        }

        return IntegrationRepositories.instance;
    }

    async UpdateIntegrationByName(name, newIntegration){
        return await this.tableName.findOne({
            where: {
                name: name
            }
        }).then(res => {
            console.log("Cập nhật thành công!")
            if(res) res.updateAttributes(newIntegration);
        })
        .catch(err => {
            console.log(err);
            return null;
        })
    }

    async getIntegrationByName(name){
        return await this.tableName.findOne({
            where: {
                name: name
            }
        }).then(res => {
            return {
                name: res.dataValues.name,
                token: res.dataValues.token,
                enable: res.dataValues.enable
            }
        })
        .catch(err => {
            console.log(err);
            return null;
        })
    }
}

IntegrationRepositories.instance = null;

module.exports = IntegrationRepositories;