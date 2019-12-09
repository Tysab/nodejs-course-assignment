const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        //match: /pattern/
    },
    //,
    // category: {
    //     type: String,
    //     required: true,
    //     enum: ['web', 'mobile', 'network'],
    //     lowercase: true,
    //     trim: true
    // },
    difficulty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Difficulty'
    },
 author: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Author'
 },
    // tags: {
    //     type: Array,
    //     validate: {
    //         isAsync: true,
    //         validator: function (v, callback) {
    //             setTimeout(() => {
    //                 // Do some async work
    //                 const result = v && v.length > 0;
    //                 callback(result);
    //             }, 4000);
    //         },
    //         message: 'A course should have at least one tag'
    //     }
    // },
    date: {
        type: Date
    },
 isPublished: Boolean
    // price: {
    //     type: Number,
    //     required: function () {
    //         return this.isPublished;
    //     },
    //     min: 10,
    //     max: 200,
    //     get: v => Math.round(v),
    //     set: v => Math.round(v)
    // }
});

courseSchema.statics.lookup = function(authorId, courseId) {
    return this.findOne({
        _id: courseId,
        author: authorId
    });
};

const Course = mongoose.model('Course', courseSchema);

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        // category: Joi.string().min(2).max(20).required(),
        difficulty: Joi.string().min(20).max(70).required(),
     author: Joi.string().min(20).max(70).required(),
        // tags: Joi.array().min(1).required(),
        // date: Joi.date().required(),
        isPublished: Joi.boolean().required(),
        // price: Joi.number().min(10).max(100).required()

    });


    return schema.validate(course, (error, value) => {});
}

module.exports.Course = Course;
module.exports.validate = validateCourse;