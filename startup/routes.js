const additem = require('../routes/additems');
const listofitems = require('../routes/listofitems');
const internalerrors = require('../middleware/internalerros');
const user = require('../routes/user');
const auth = require('../routes/auth');
const addingtocart = require('../routes/addToCart');
const getinvestment = require('../routes/getinvestment');
const express = require('express')
const logout = require('../routes/logout');

module.exports = function (app) {
    
    app.use('/api/additems',additem);
    app.use('/api/listofitems', listofitems);
    app.use('/api/registeration',user);
    app.use('/api/login', auth);
    app.use('/api/logout', logout);
    app.use('/api/addtocart', addingtocart);
    app.use('/api/totalinvestment', getinvestment)
    app.use('/uploads',express.static('uploads'));
    app.use(internalerrors);
}
