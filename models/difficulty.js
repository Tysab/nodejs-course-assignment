const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Difficulty = mongoose.model('Difficulty', new mongoose.Schema({
    level: String
}));

function validateDifficulty(difficulty) {
    const schema = Joi.object({
        level: Joi.string().min(2).max(20).required()
    });


    return schema.validate(difficulty, (error, value) => {});
}


module.exports.Difficulty = Difficulty;
module.exports.validate = validateDifficulty;
