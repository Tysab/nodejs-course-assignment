// root path is /register

const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const router = express.Router();
const { Author, validate } = require('../models/author');
const Fawn = require('fawn');
const sanitizeHtml = require('sanitize-html');
const _ = require('lodash');
const bcrypt = require('bcrypt');


router.get('/', async (req, res) => { // views all courses
    console.log('Connected to /register');

    res.render('register');

});


router.post('/', async (req, res) => {

    const { error } = validate(req.body);

    if (!error) {
        console.log('Author input-validation pass');
    } else if (error) {
        console.log(error);
        return res.status(400).send(`Something went wrong: ${error.details[0].message}`);
    }

    let user = await Author.findOne({
        email: req.body.email
    });

    if (user) return res.status(400).send('This email is already in use <a href="/register">Try again</a>');



    // let author = new Author({
    //     name: sanitizeHtml(req.body.name),
    //     email: sanitizeHtml(req.body.email),
    //     password: sanitizeHtml(req.body.password)
    // });

    let author = new Author(_.pick(req.body, ['name', 'email', 'password']));

    const salt = await bcrypt.genSalt(10);
    author.password = await bcrypt.hash(author.password, salt);

    try {
        const result = await author.save();
        console.log(result);
        //res.send('account created! go to back to <a href="/">home</a>');

        const token = author.generateAuthToken();

        res.header('x-auth-token', token).send(_.pick(author, ['_id', 'name', 'email']));


    } catch (ex) {
            console.log(ex);
    }

    //new Fawn.Task()
    //    .save('authors', author)
    //    .run()
    //    .then(result => {
    //        res.send('account created! go to back to <a href="/">home</a>');
    //        console.log(result);
    //    })
    //    .catch(err => {
    //        res.status(500).send(`${err} <a href="/register">Try again</a>`);
    //        console.log(err);
    //    });

});


module.exports = router;