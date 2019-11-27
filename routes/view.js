// root path is /courses/view

const express = require('express');
const router = express.Router();
const { Course, validate } = require('../models/course');


router.get('/:id/:name', async (req, res) => { // views specific course
    //const getID = courses.find(c => c.id === parseInt(req.params.id) && c.name === req.params.name);
    //if(!getID) return res.status(404).send("The page you are looking for was not found");

    return await Course
        .find({
            _id: req.params.id,
            name: req.params.name
        })
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
        .then(result => {
            res.render('courses-info', result[0]);
            console.log(result);
        })
        .catch(result => {
            res.status(404).send(result);
            console.log(result);
        });

});

router.post('/change', async (req, res) => {
    const {
        error
    } = validate(req.body);

    return await Course.updateOne({
        _id: req.body.id
    }, {
        $set: {
            name: req.body.name,
            tags: req.body.tags,
            category: req.body.category,
            author: req.body.author,
            price: req.body.price
        }
    }, {
        new: true
    }, (e, r) => {
        if (e) {
            res.status(404).send(e);
        } else if (r) {
            res.send('Course changed! <a href="/courses">Go back to /courses</a>');
        }
    });
});

module.exports = router;