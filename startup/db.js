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
    const db = config.get('db_test');
    mongoose.connect(db)
        .then(() => {
            winston.info(`Connected to ${db}...`),
                console.log(`Connected to ${db}...`)
        });
}