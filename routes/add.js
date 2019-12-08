// root path is /courses/add
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Fawn = require('fawn');
const {
    Author
} = require('../models/author');
const {
    Course,
    validate
} = require('../models/course');
const {
    Difficulty
} = require('../models/difficulty');

//Fawn.init(mongoose);


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

router.post('/', auth, async (req, res) => {

    const {
        error
    } = validate(req.body);

    if (!error) {
        console.log('Course input-validation pass');
    } else if (error) {
        console.log(error);
        return res.status(400).send(`Something went wrong: ${error.details[0].message}`);
    }

    let course = new Course({
        name: req.body.name
    });

    course = await course.save();
    res.send(course);

    // new Fawn.Task()
    //     .save('courses', course)
    //     .run();


    //res.send('Course Added! <a href="/courses">Go back to /courses</a>');

    // } catch (ex) {
    //     for (field in ex.errors)
    //         res.send(ex.errors[field].message);
    // }
});

module.exports = router;