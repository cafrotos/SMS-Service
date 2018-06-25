const sender = require('../../../routers/validation/senderValidation')
const Err = require('http-errors');

module.exports = (req, res, next) => {
    let token = req.get('token');
    
    if(sender.getInstance().Validation(token) == false){
        let err = new Err(400, "Không nhận xác thực");
        next(err);
    }

    next();
}