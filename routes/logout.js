const express = require('express');
const cors = require('cors');
const auth = require('../middleware/auth');
const {User} = require('../models/user')
const router = express.Router();
router.use(cors());

router.get('/', auth, async(req,res) => {
    
    res.send("User successfully loggedout")
}); 

module.exports = router;