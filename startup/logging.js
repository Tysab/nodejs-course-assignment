//  Loading modules
const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function (key) {

    // process.on('uncaughtException', (ex) => {
    //     winston.error(ex.message, ex);
    //     process.exit(1);
    // });

    winston.handleExceptions(new winston.transports.File({
        filename: 'uncaughtExceptions.log'
    }));

    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    winston.add(new winston.transports.File({
        filename: 'logfile.log'
    }));

    winston.add(new winston.transports.MongoDB({
        db: key,
        level: 'info'
    }));

    // //throw new Error('Index.js error');
    // const p = Promise.reject(new Error('Something failed in the index!'));

    // p.then(() => console.log('Done'));
}