require('dotenv').config();
const error = require('./middleware/error');
const config = require('config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {
    keys
} = require('./keys');

// Calling routes
const home = require('./routes/home');
const login = require('./routes/login');
const register = require('./routes/register');
const courses = require('./routes/courses');
const view = require('./routes/view');
const add = require('./routes/add');
const del = require('./routes/delete');
const auth = require('./routes/auth');

const port = process.env.PORT || 3000;

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
} else {
    console.log(`PRIVATE KEY IS: ${config.get('jwtPrivateKey')}`);
}

//mongoose.connect('mongodb://localhost/mongo-vidly')
mongoose.connect(keys.mongodb)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

//  Setting middleware functions
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());

//  Setting routes
app.use('/', home); // sets / path to home.js router
app.use('/auth', auth); // sets /auth path to auth.js router
app.use('/login', login); // sets /login path to login.js router
app.use('/register', register); // sets /register path to register.js router
app.use('/courses', courses); // sets /courses path to courses.js router
app.use('/courses/view', view); // sets /courses/view path to courses.js router
app.use('/courses/add', add); // sets /courses/add path to courses.js router
app.use('/courses/add', add); // sets /courses/add path to courses.js router
app.use('/courses/delete', del); // sets /courses/delete path to courses.js router

app.use(error);


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});