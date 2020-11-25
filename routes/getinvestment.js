const express = require('express');
const router = express.Router();
const cors = require('cors');
const {AddItems} = require('../models/additems');
router.use(express.json());
router.use(cors());
router.get('/', async( req, res ) => {

    let total = 0;
    const item = await AddItems.find().select("purchaseprice -_id");
    
    for (let index = 0; index < item.length; index++) {
        total = total + item[index].purchaseprice;
    }
    res.send({TotalInvestment : total});
})

module.exports = router;