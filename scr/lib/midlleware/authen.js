const Err = require('http-errors');
const ShippoValidation = require('../../../routers/validation/ShippoValidation');

module.exports = abc = async (req, res, next) => {
    let token = req.get('token');

    let isAccess = await ShippoValidation(token);

    if (!isAccess) {
        let err = new Err(400, "Không nhận xác thực");
        next(err);
    }

    next();
}