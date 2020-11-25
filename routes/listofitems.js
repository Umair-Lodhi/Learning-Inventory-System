const express = require('express');
const {AddItems} = require('../models/additems')
const router = express.Router();
router.use(express.json());
// const cors = require('cors');
// router.use(cors());

router.get('/', async(req, res) => {

    const myDataBase = await AddItems.find().select('-numOfSoldItem -_id -purchaseprice -__v');
    res.send(myDataBase);
});
module.exports = router;    