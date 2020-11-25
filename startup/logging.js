const winston = require('winston');
require('express-async-errors');
module.exports = function () {
    
    winston.exceptions.handle( new winston.transports.File({filename:'uncaughtExceptions.log'}));
    
    winston.add(new winston.transports.File({filename:'logfile.log',level:"info"}));
    
    process.on('unhandledRejection',(ex)=>{
    throw ex;
    });
}