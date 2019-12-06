//  Loading modules
const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = function (key) {
    //  Local DB connection
    //mongoose.connect('mongodb://localhost/mongo-vidly')

    //  original DB connection
    // mongoose.connect(key)
    //     .then(() => {
    //         winston.info('Connected to MongoDB...'),
    //         console.log('Connected to MongoDB...')
    //     });

    //  Test environment DB connection
    mongoose.connect(config.get('db_test'))
        .then(() => {
            winston.info('Connected to MongoDB...'),
                console.log('Connected to MongoDB...')
        });
}