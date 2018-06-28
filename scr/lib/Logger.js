"use strict";

let util = require("util");
let moment = require("moment");
let winston = require("winston");
let DailyRotateFile = require('winston-daily-rotate-file');

let env = process.env.NODE_ENV || 'development';
let setting = require('../../config/setting.json')[env];

let MESSAGE = Symbol.for('message');

class Logger {

    static factory(channel) {

        let log_level = process.env.LOG_LEVEL || (setting['log_level'] || 'debug');

        if (!this._loggers[channel] || this._loggers[channel].level != log_level) {
            this._loggers[channel] = winston.createLogger({
                level: log_level,
                format: winston.format.combine(winston.format(function (info, opts) {
                    let prefix = util.format('[%s] [%s]', moment().format('YYYY-MM-DD hh:mm:ss').trim(), info.level.toUpperCase());
                    if (info.splat) {
                        info.message = util.format('%s %s', prefix, util.format.apply(util, [info.message].concat(info.splat)));
                    }
                    else {
                        info.message = util.format('%s %s', prefix, info.message);
                    }
                    return info;
                })(), winston.format(function (info) {
                    info[MESSAGE] = info.message + ' ' + JSON.stringify(Object.assign({}, info, {
                        level: undefined,
                        message: undefined,
                        splat: undefined
                    }));
                    return info;
                })()),
                transports: [
                    new winston.transports.Console(),
                    new (DailyRotateFile)({
                        filename: setting['log_dir'] + channel + '-%DATE%.log',
                        datePattern: 'YYYY-MM-DD-HH',
                        zippedArchive: true,
                        maxSize: '20m',
                        maxFiles: '14d'
                    })
                ]
            });
        }
        return this._loggers[channel];
    };
};

Logger._loggers = {};

module.exports = Logger;