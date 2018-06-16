const sender = require('../../scr/lib/midlleware/token')

var senderValidation = (token) => {
    if(token === sender.shippovn)
        return "ShippoVN";
    else return "ShippoPhilipin";
}

module.exports = senderValidation;