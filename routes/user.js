const lodash = require('lodash');
const bcrypt = require('bcrypt');
const {User, validatingUser} = require('../models/user');
const path = require('path')
const express = require('express');
const router = express();
var cors = require('cors');
router.use(express.json());

router.use(cors());

router.post('/', async(req , res) => {

    const {error} = validatingUser(req.body);
    console.log('data', req.body)
    if(error) return res.status(400).send({status:'400',errorMessage:error.details[0].message });

    const checkEmail = await User.findOne({email:req.body.email});
    if(checkEmail) return res.status(400).send({status:'400',errorMessage: "Email already taken"});
    
    const user = new User( lodash.pick(req.body, ['name','email','password','address','city']));
    
    const salt = await bcrypt.genSalt(10);
    user.password =await bcrypt.hash(user.password, salt);

    await user.save();
    const token = user.genauthtoken();

    res.status(200).header('x-auth-token', token).send({status:"200", userData:lodash.pick(user,['_id','email','name','address','city'])});

    // res.send(user);
});

module.exports = router;