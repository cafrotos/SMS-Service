const db = require('../../models');

class BaseIntegration {

    constructor(name){
        this.instance = name;
        this.token = '';
        this.enable = false;
    }

    async getIntegration(){
        await db.integration.findOne({where:{name: this.instance}})
            .then(info => {
                this.token = info.dataValues.token;
                this.enable = info.dataValues.enable;
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

        if(!data || !data.name || !data.token || !data.enable){
            console.log("Thiếu thông tin đối tác cập nhật");
            return null;
        }
        
        db.findOne({where: {name: data.name}})
            .then(integration => {
                if(integration){
                    integration.updateAttributes(data);
                }
            })
            .catch(err => console.log(err));
    }

}


module.exports = BaseIntegration