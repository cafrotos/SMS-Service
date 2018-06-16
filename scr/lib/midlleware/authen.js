const sender = require('./token')
const Err = require('http-errors');

module.exports = (req, res, next) => {
    let token = req.get('token');
    
    if(token != sender.shippovn && token != sender.shippophil) {
        let err = new Err(400, "Không nhận xác thực");
        next(err);
    }

    next();
}