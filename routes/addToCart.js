const { AddItems } = require('../models/additems');
const { validatingPurchasingItem , Cart } =require('../models/addtocart');
const lodash = require('lodash');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
router.use(express.json());

router.post('/:id', async (req, res) => {

    const {error} = validatingPurchasingItem(req.body);
    if (error) return res.status(400).send({ status: "400 Bad Request", errorMessage: error.details[0].message });

    const item = await AddItems.findById(req.body.itemID);
    if (!mongoose.Types.ObjectId.isValid) return res.status(400).send({ status: "400 Bad Request",errorMessage: 'Item ID is not valid' });
    if (!item) return res.status(400).send({ status: "400 Bad Request",errorMessage: 'Item not found' });

    const cartItem = new Cart({
        item:{
            _id: item._id,
            name: item.name,
            saleprice: item.saleprice,
            numOfItem: item.numOfItem,
            purchaseprice: item.purchaseprice,
            profitBySingleItem: item.profitBySingleItem,
            totalProfit: item.totalProfit
        }}
    );

    if (item.numOfItem <= 0) return res.status(400).send({ status: "400 Bad Request",errorMessage: 'Item is not available' });

    await cartItem.save();
    
    item.profitBySingleItem = item.saleprice - item.purchaseprice; 

    item.totalProfit = item.totalProfit + item.profitBySingleItem;

    item.numOfSoldItem++;
    item.numOfItem--;
    item.save();

    res.send(cartItem);
});


module.exports = router;