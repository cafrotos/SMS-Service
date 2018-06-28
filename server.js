'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const evenHandler = require('./scr/smsListener/EvenHandler');
let helmet = require('helmet');
let morgan = require('morgan');
let port = process.env.PORT || 8080;

app.use('/', morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());
app.use('/sms', require('./scr/lib/midlleware/authen'));
app.use('/', require('./routers/index'));

app.use((req, res, next) => {
    var err = new Error('Not found');
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        'errors': {
            message: err.message,
            error: {}
        }
    })
})


app.listen(port, () => {
    console.log(port);
})

evenHandler();