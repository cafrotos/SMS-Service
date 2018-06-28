'use strict'

let fs = require('fs');
let path = require('path');
let basename = path.basename(__filename);

var readAllEven = () => {
    fs.readdirSync(__dirname)
        .filter(file => {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        })
        .forEach(file => {
            file = file.replace(file.slice(-3), '');
            if (file != 'contants') {
                require('./' + file);
            }
        });
}

module.exports = readAllEven;


