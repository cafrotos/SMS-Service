const db = require('../../models');

class BaseIntegration{
    static async getIntegration(name){
        
        return db.integration.findOne({
            where: {
                name: name
            }
        })
            .then((res) => {
                if(res.dataValues.enable === true) return res.dataValues.token;
                else return null;
            })
            .catch(err => console.log("Không thể tìm thấy đối tác"));
    }

    addIntegration(){

    }
}

module.exports = BaseIntegration;