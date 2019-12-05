//  Loading modules
const express = require('express');
const error = require('../middleware/error');

//  Calling routes
const home = require('../routes/home');
const login = require('../routes/login');
const register = require('../routes/register');
const courses = require('../routes/courses');
const view = require('../routes/view');
const add = require('../routes/add');
const del = require('../routes/delete');
const auth = require('../routes/auth');

module.exports = function(app) {
    
    //  Setting middleware functions
    app.set('view engine', 'ejs');
    app.use(express.json());
    app.use(express.urlencoded());
    
    //  Setting routes
    app.use('/', home);                         // sets / path to home.js router
    app.use('/auth', auth);                     // sets /auth path to auth.js router
    app.use('/login', login);                   // sets /login path to login.js router
    app.use('/register', register);             // sets /register path to register.js router
    app.use('/courses', courses);               // sets /courses path to courses.js router
    app.use('/courses/view', view);             // sets /courses/view path to courses.js router
    app.use('/courses/add', add);               // sets /courses/add path to courses.js router
    app.use('/courses/add', add);               // sets /courses/add path to courses.js router
    app.use('/courses/delete', del);            // sets /courses/delete path to courses.js router
    
    //  Setting error middleware after routing
    app.use(error);
}