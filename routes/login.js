// root path is /login

const express = require('express');
const router = express.Router();
const { Author } = require('../models/author');
const Fawn = require('fawn');
const sanitizeHtml = require('sanitize-html');


router.get('/', async (req, res) => { // views all courses
    console.log('Connected to /register');

    //res.render('login');
    res.send("this page doesn't exist yet. Go back to <a href='/home'>home</a> instead");

});


router.post('/', async (req, res) => {

    try {

        let author = new Author({
            name: sanitizeHtml(req.body.name),
            email: sanitizeHtml(req.body.email),
            password: sanitizeHtml(req.body.password)
        });

        new Fawn.Task()
            .save('authors', author)
            .run();

    } catch (e) {
        res.status(500).send(e);
    }

});


module.exports = router;