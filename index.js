const express = require('express');
const config = require('config');
const winston = require('winston');
const app = express();

require('./startup/db')();
require('./startup/routes')(app);   
require('./startup/logging')();
require('./startup/prod')(app);

if(!config.get('jwtPrivateKey')){
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined');
}
// console.log(porcess.env.NODE_ENV);
const port = process.env.PORT || 4000;
app.listen(port, () => winston.info(`Listening to port ${port}....`));
