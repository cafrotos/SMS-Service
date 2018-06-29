let ShippoRepositories = require('../../scr/repositories/ShippoTokenRepositories');

let ShippoValidation = async (token) => {
    let ShippoToken = await ShippoRepositories.getInstance().getAllShippoData();

    for (let i = 0; i < ShippoToken.length; i++) {
        if (token === ShippoToken[i].token) return true;
        else return false;
    }
}

module.exports = ShippoValidation;
