var deliReportValidation = (data) => {
    if(!data || !data.type || !data.tranId || !data.phone || !data.status)
        return false;
    else return true;
}

module.exports = deliReportValidation;