// root path is /

const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('go to <a href="/courses">/courses</a> <br> or <a href="/register">register </a> or <a href="login">login</a>');
});

module.exports = router;