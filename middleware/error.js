module.exports = function (err, req, res, next) {
    //  Log the exception
    res.status(500).send(`Something went wrong: ${err.message}`);
};