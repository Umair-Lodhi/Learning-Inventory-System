const lodash = require('lodash');
const express = require('express');
const multer = require('multer');
const helpers = require('./helpers');

const { AddItems, validatingItems } = require('../models/additems');
const route = express.Router();
route.use(express.json());
var cors = require('cors');
route.use(cors());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname )        
    }
});
const upload = multer({
    storage: storage,
    fileFilter: helpers.imageFilter 
});


route.get('/',async (req, res) => {

    const myDataBase = await AddItems.find();
    res.send(myDataBase);
});

route.get('/:id', async (req, res) => {

    const mySearchedID = await AddItems.findById(req.params.id);
    if (!mySearchedID) return res.status(400).send({ status: 'bad Request 400', errorMessage: 'ID not found' });
    res.send(mySearchedID);
});

route.post('/', upload.single('productPic'),async (req, res) => {

    const { error } = validatingItems(req.body);
    if (error) return res.status(400).send({ status: '400', errorMessage: error.details[0].message });
    
    const newItem = new AddItems({
        name: req.body.name,
        purchaseprice : req.body.purchaseprice,
        saleprice: req.body.saleprice,
        numOfItem: req.body.numOfItem,
        productPic:req.file.path
    })

    const checkName = await AddItems.findOne({ name: req.body.name });
    if (checkName) return res.status(400).send({ status: '400', errorMessage: "Name already available you can change other properties", existedItem: checkName });

    await newItem.save();
    res.send(newItem);
});

route.put('/:id',upload.single('productPic'),async (req, res) => {

    let mySearchedID = await AddItems.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        purchaseprice : req.body.purchaseprice,
        saleprice: req.body.saleprice,
        numOfItem: req.body.numOfItem,
        productPic: req.file.path
    });
    if (!mySearchedID) return res.status(400).send({ status: '400 Bad Request', errorMessage: "ID not found" })
   

    const { error } = validatingItems(req.body);
    if (error) return res.status(400).send({ status: '400 Bad Request', errorMessage: error.details[0].message });

    res.send(mySearchedID);
});

route.delete('/:id', async (req, res) => {

    const mySearchedID = await AddItems.findByIdAndRemove(req.params.id, {
        useFindAndModify: false
    });
    if (!mySearchedID) return res.status(400).send({ status: '400 Bad Request', errorMessage: "ID not Found" })

    res.send(mySearchedID);

});
module.exports = route;