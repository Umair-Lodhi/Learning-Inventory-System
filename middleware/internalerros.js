const winston = require('winston');
require('express-async-errors');
module.exports = function (err, req, res, next) {
    
    winston.error(err.message);
    res.status(500).send({status:'Internal server error', errorMessage:'Something went failed'});
}