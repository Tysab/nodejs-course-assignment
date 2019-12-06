//  Loading modules
const winston = require('winston');
//require('winston-mongodb');
require('express-async-errors');

module.exports = function (key) {

    //  error
    //  warn
    //  info
    //  verbose
    //  debug
    //  silly

    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    winston.add(new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`),
        ),
        handleExceptions: true
    }));

    winston.add(new winston.transports.File({
            filename: 'uncaughtExceptions.log',
            level: 'error',
            handleExceptions: true
        }),
        new winston.transports.File({
            filename: 'logfile.log',
            level: 'info'
        }));


    // winston.add(new winston.transports.MongoDB({
    //     db: key,
    //     level: 'info',
    //     format: winston.format.combine(
    //         winston.format.timestamp(),
    //         winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`),
    //     ),
    //     handleExceptions: true
    // }));

    // //throw new Error('Index.js error');
    // const p = Promise.reject(new Error('Something failed in the index!'));

    // p.then(() => console.log('Done'));
}