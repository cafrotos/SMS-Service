'use strict'
const SECRET = 'abcxyz';

var deliReportValidation = (secret) => {
    if (secret === SECRET)
        return true;
    else return false;
}

module.exports = deliReportValidation;