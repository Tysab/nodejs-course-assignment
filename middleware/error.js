const winston = require('winston');

module.exports = function (err, req, res, next) {

    //  error
    //  warn
    //  info
    //  verbose
    //  debug
    //  silly

    //  Log the exception
    winston.error(err);


    res.status(500).send(`Something went wrong: ${err.message}`);
};