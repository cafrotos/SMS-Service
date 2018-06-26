"use strict";
var winston = require('winston');

class Logger {
    constructor(logger) {
        this.winstonLogger = logger;
    }
    
    static factory(channel, level = 'info') {
        if (!Logger.instances[channel]) {
            var logger = new (winston.Logger)({
                transports: [
                    new (winston.transports.Console)()
                ]
            });
            var path = require('path');
            var dirname = Logger.getDirname();
            logger.add(require('winston-daily-rotate-file'), {
                datePattern: 'yyyyMMdd',
                dirname: path.join(dirname, "log"),
                filename: path.join(dirname, "log", channel + ".txt"),
                level: level
            });
            Logger.loggers[channel] = logger;
            Logger.instances[channel] = new Logger(logger);
        }
        return Logger.instances[channel];
    }
    //endregion
    error(err, context = null) {
        this.winstonLogger.error('Error name: ' + err.name + ' Error message: ' + err.message + '\r\n Stack:' + err.stack, context);
    }
    warn(message, context = null) {
        this.winstonLogger.warn(message, context);
    }
    info(message, context = null) {
        this.winstonLogger.info(message, context);
    }
}
Logger.loggers = [];
Logger.instances = [];
exports.Logger = Logger;

module.exports = Logger;