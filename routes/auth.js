const express = require('express');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const Joi = require('joi');
const auth = require('../middleware/auth');
const router = express();
router.use(express.json());
var cors = require('cors')
router.use(cors());

router.get('/me', auth  ,async (req , res) => {
    const user = await User.findById(req.user._id);
    console.log(user)
    res.send(user);
});

router.post('/', async(req, res) => {

    const {error} = login(req.body);
    console.log("data", req.body)
    if(error) return res.status(400).send({status:'400', errorMessage: error.details[0].message});

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send({status:'400', errorMessage: "Incorrect or Invalid Email"});

    const checkPassword = await bcrypt.compare(req.body.password,user.password);
    if(!checkPassword) return res.status(400).send({status:'400', errorMessage:"Incorrect Password"});

    const token = user.genauthtoken();
    res.send({userData: user, Token: token, message: 'Login Successfull'});
});

function login(req) {
    const schema = Joi.object({
        password:Joi.string().min(5).max(255).required(),
        email:Joi.string().min(5).max(255).email().required()
    });
    const validation = schema.validate(req);
    return validation;
}

module.exports = router;