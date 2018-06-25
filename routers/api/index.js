'use strict'

var router = require('express').Router();

router.get('/', (req, res, next) => {
    res.send("SMS service");
})

module.exports = router;