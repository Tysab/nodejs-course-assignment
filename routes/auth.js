// root path is /auth

const express = require('express');
const router = express.Router();
const { Author } = require('../models/author');
const Fawn = require('fawn');
const sanitizeHtml = require('sanitize-html');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('config');



router.get('/', async (req, res) => { // views all courses
    console.log('Connected to /auth');

    res.render('auth');

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

    if (!user) return res.status(400).send('Invalid email or password <a href="/auth">Try again</a>');


    // let author = new Author({
    //     name: sanitizeHtml(req.body.name),
    //     email: sanitizeHtml(req.body.email),
    //     password: sanitizeHtml(req.body.password)
    // });



    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if(!validPassword) return res.status(400).send('Invalid email or password <a href="/auth">Try again</a>');

    const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));

    res.send(token);


    // let author = new Author(_.pick(req.body, ['name', 'email', 'password']));

    // const salt = await bcrypt.genSalt(10);
    // author.password = await bcrypt.hash(author.password, salt);

    // try {
    //     const result = await author.save();
    //     console.log(result);
    //     //res.send('account created! go to back to <a href="/">home</a>');

    //     res.send(_.pick(author, ['name', 'email']));
    
    // } catch (ex) {
    //         console.log(ex);
    // }

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

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(8).max(255).required().email(),
        password: Joi.string().min(6).max(255).required()
    });

    return schema.validate(req, (error, value) => {});
}


module.exports = router;