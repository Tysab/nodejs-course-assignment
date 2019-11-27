const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { keys } = require('./keys');

// Calling routes
const home = require('./routes/home');
const login = require('./routes/login');
const register = require('./routes/register');
const courses = require('./routes/courses');
const view = require('./routes/view');
const add = require('./routes/add');
const del = require('./routes/delete');


//mongoose.connect('mongodb://localhost/mongo-vidly')
mongoose.connect(keys.mongodb)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use(express.urlencoded());

//  Setting routes
app.use('/', home);                 // sets / path to home.js router
app.use('/login', login);           // sets /login path to login.js router
app.use('/register', register);     // sets /register path to register.js router
app.use('/courses', courses);       // sets /courses path to courses.js router
app.use('/courses/view', view);     // sets /courses/view path to courses.js router
app.use('/courses/add', add);       // sets /courses/add path to courses.js router
app.use('/courses/delete', del);    // sets /courses/delete path to courses.js router

app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Listening on port ${port}`)});