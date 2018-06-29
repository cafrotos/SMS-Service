'use strict'

const db = require('../../models');
let BasicRepositories = require('../lib/Basic/BasicRepositories');

class IntegrationRepositories extends BasicRepositories {
    constructor() {
        super(db.integration);
    }

    static getInstance() {
        if (!IntegrationRepositories.instance) {
            IntegrationRepositories.instance = new IntegrationRepositories;
        }

        return IntegrationRepositories.instance;
    }

    async updateIntegrationByName(name, newIntegration) {
        return await this.tableName.findOne({
            where: {
                name: name
            }
        }).then(integration => {
            console.log("Cập nhật thành công!")
            if (integration) integration.updateAttributes(newIntegration);
        })
            .catch(err => {
                console.log(err);
                return null;
            })
    }

    async getIntegrationByName(name) {
        return await this.tableName.findOne({
            where: {
                name: name
            }
        }).then(integration => {
            return {
                name: integration.dataValues.name,
                token: integration.dataValues.token,
                enable: integration.dataValues.enable
            }
        })
            .catch(err => {
                console.log(err);
                return null;
            })
    }
}

module.exports = IntegrationRepositories;