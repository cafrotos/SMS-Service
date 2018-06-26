const Err = require('http-errors');
const ShippoValidation = require('../../../routers/validation/ShippoValidation')

module.exports = abc = (req, res, next) => {
    let token = req.get('token');

    if(ShippoValidation(token) == false){
        let err = new Err(400, "Không nhận xác thực");
        next(err);
    }

    next();
}