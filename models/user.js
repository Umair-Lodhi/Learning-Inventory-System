const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:5,
        maxlength:255,
        required:true
    },
    email:{
        type:String,
        minlength:5,
        maxlength:25,
        required: true,
        unique:true
    },
    password:{
        type:String,
        minlength:5,
        maxlength:1024,
        required: true
    },
    isAdmin:{
        type:Boolean
    },
    address:{
        type: String,
        minlength:5,
        maxlength:1024,
        required: true
    },
    city:{
        type: String,
        minlength:5,
        maxlength:1024,
        required: true
    }
});
userSchema.methods.genauthtoken = function () {
    const token  = jwt.sign({_id: this._id, name:this.name ,isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validatingUser(user) {
    
    const schema = Joi.object({
        
        name:Joi.string().min(5).max(255).required(),
        password:Joi.string().min(5).max(255).required(),
        email:Joi.string().min(5).max(255).email().required(),
        address:Joi.string().min(5).max(1024).required(),
        city: Joi.string().min(3).max(15).required()
    });
    const validation = schema.validate(user);
    return validation;
}

module.exports.User = User;
module.exports.validatingUser = validatingUser;
module.exports.userSchema = userSchema;