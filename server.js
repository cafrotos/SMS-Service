const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const evenHandler = require('./scr/smsListener/EvenHandler');
let helmet = require('helmet');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());
app.use('/sms', require('./scr/lib/midlleware/authen'))
app.use('/', require('./routers/index'));

app.use((req, res, next) => {
    var err = new Error('Not found');
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({'errors':{
        message: err.message,
        error: {}
    }})
})

let port = normalizePort(process.env.PORT || 3000);

app.listen(port, () => {
    console.log(port);
})

function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        console.log(val)
        return val;
    }

    if (port >= 0) {
        // port number
        console.log(port);
        return port;
    }

    return false;
}

evenHandler();