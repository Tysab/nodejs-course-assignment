//  Loading modules
const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function (key) {
    //mongoose.connect('mongodb://localhost/mongo-vidly')
    mongoose.connect(key)
        .then(() => {
            winston.info('Connected to MongoDB...'),
            console.log('Connected to MongoDB...')
        })
}