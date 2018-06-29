'use strict'

const db = require('../../models');
let BasicRepositories = require('../lib/Basic/BasicRepositories');

class ShippoTokenRepositories extends BasicRepositories {
    constructor() {
        super(db.shippo_token);
    }

    static getInstance() {
        if (!ShippoTokenRepositories.instance) {
            ShippoTokenRepositories.instance = new ShippoTokenRepositories;
        }
        return ShippoTokenRepositories.instance;
    }

    async updateByName(name, newBranch) {
        return await this.tableName.findOne({
            where: {
                name: name
            }
        }).then(branch => {
            if (branch) branch.updateAttributes(newBranch);
        })
            .catch(err => {
                console.log(err);
                return null;
            })
    }

    async getAllShippoData() {
        if (!ShippoTokenRepositories.data)
            ShippoTokenRepositories.data = await this.getAllinDatabase();

        return ShippoTokenRepositories.data;
    }
}

module.exports = ShippoTokenRepositories;