// root path is /courses

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Course } = require('../models/course');
const { Author } = require('../models/author');
const { Difficulty } = require('../models/difficulty');


router.get('/', async (req, res, next) => { // views all courses
    console.log('Connected to /courses');

    try {
        Difficulty.find()
            .select('level')
            .then(result_dif => {
                Author.find()
                .select()
                .then(result_auth => {
                Course.find()
                    // .skip((pageNumber - 1) * pageSize)
                    // .limit(pageSize)
                    .sort({
                        name: 1
                    })
                    .populate('difficulty', '_id level')
                    .select({
                        name: 1,
                        tags: 1,
                        price: 1,
                        difficulty: 1,
                        category: 1,
                        author: 1,
                        date: 1
                    })
                    .then(result_course => {
                        res.render('courses', {
                            difficulty: result_dif,
                            courses: result_course,
                            author: result_auth
                        });
                        //console.log(result_dif);
                        //console.log(result_course);
                    })
                    .catch(error => {
                        res.status(500).send(`Database error: ${error.message}`);
                    });
                });

            });


    } catch (err) {
        next(ex);
    }

});


module.exports = router;