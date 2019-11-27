// root path is /courses/add

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Fawn = require('fawn');
const { Author, validate } = require('../models/author');
const { Course } = require('../models/course');
const { Difficulty } = require('../models/difficulty');

Fawn.init(mongoose);


router.get('/', async (req, res) => {
    console.log('Connected to /courses/add');

    try {
        Difficulty
            .find()
            .select(
                '_id level'
            )
            .then(result => {
                Author
                    .find()
                    .select('_id name')
                    .then(result_auth => {
                        res.render('courses-add', {
                            author: result_auth,
                            difficulty: result
                        });
                    })
            });

        return Difficulty;
    } catch (e) {
        res.status(404).send(e);
    }
});

router.post('/', async (req, res) => {

    try {
        let course = new Course({
            name: req.body.name,
            category: req.body.category,
            author: req.body.author,
            tags: [req.body.tags],
            isPublished: true,
            price: req.body.price,
            difficulty: req.body.difficulty
        });

        //let course_save = await course.save();

        new Fawn.Task()
            .save('courses', course)
            .run();
    } catch (ex) {
        res.status(500).send(ex);
    }

    res.send('Course Added! <a href="/courses">Go back to /courses</a>');

    // } catch (ex) {
    //     for (field in ex.errors)
    //         res.send(ex.errors[field].message);
    // }
});

module.exports = router;