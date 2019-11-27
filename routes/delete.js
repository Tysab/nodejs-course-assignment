// root path is /courses/delete

const express = require('express');
const router = express.Router();
const { Course } = require('../models/course');

router.get('/:id/:name', async (req, res) => { // deletes specific course

    try {
        const remove = await Course.findByIdAndRemove(req.params.id);
        // Returns to course page
        res.send('Course deleted! <a href="/courses">Go back to /courses</a>');
    } catch (ex) {
        for (field in ex.errors)
            res.send(ex.errors[field].message);
    }

});

module.exports = router;