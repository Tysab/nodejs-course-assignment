const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minLength: 8,
        maxLength: 255
    },
    password: {
        type: String,
        hide: true,
        required: true,
        minLength: 6,
        maxLength: 1024
    }
});

authorSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
    return token;
};

const Author = mongoose.model('Author', authorSchema);

function validateAuthor(author) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(8).max(255).required().email(),
        password: Joi.string().min(6).max(255).required()
    });

    return schema.validate(author, (error, value) => {});
}

module.exports.Author = Author;
module.exports.validate = validateAuthor;