class BasicRepositories{
    constructor(tableName){
        this.tableName = tableName;
    }

    async AddObjectToTable(object){
        return await this.tableName.create(object)
            .then(res => {
                console.log("Đã thêm vào database!");
                return res.dataValues;
            })
            .catch(err => {
                console.info("Lỗi " + err);
                return null;
            })
    }

    async UpdateObjectToTable(id, newObject){
        return await this.tableName.findById(id)
            .then(res => {
                console.log("Cập nhật thành công!")
                console.log(newObject);
                if(res) res.updateAttributes(newObject);
            })
    }

    async getAllinDatabase(){
        return await this.tableName.findAll()
            .then(res => {
                let arr = [];
                for(let i = 0; i < res.length; i++){
                    let data = res[i].dataValues;
                    arr.push(data);
                }
                return arr;
            })
            .catch(err => {
                console.log(err);
                return null;
            })
    }
}

module.exports = BasicRepositories;