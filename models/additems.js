const mongoose = require('mongoose');
const Joi = require('joi');

const itemSchema = new mongoose.Schema({
    name:{
        type: String,
        minlength:3,
        maxlength:255,
        required:true,
        trim:true
    },    
    purchaseprice:{
        type:Number,
        required:true,
        min:5,
        max:100000
    },
    saleprice:{
        type:Number,
        required:true,
        min:5,
        max:100000
    },
    numOfItem:{
        type: Number,
        required: true,
    },
    numOfSoldItem:{
        type: Number,
        default:0,
    },
    profitBySingleItem:{
        type: Number,
    },
    totalProfit:{
        type: Number,
        default: 0
    },

    productPic:{
        type:String,
    }

});

const AddItems = mongoose.model('AddItems', itemSchema);

function validatingItems(AddItems) {

    const schema = Joi.object({
        name:Joi.string().min(3).max(255).required(),
        purchaseprice:Joi.number().min(5).max(100000).required(),
        saleprice:Joi.number().min(5).max(100000).required(),
        numOfItem: Joi.number().required(),
        numOfSoldItem:Joi.number(),
        profitBySingleItem: Joi.number(),
        totalProfit: Joi.number(),
        // productPic: Joi.string().required()
    });

    const validation =  schema.validate(AddItems);
    return validation;
}

module.exports.AddItems = AddItems;
module.exports.validatingItems = validatingItems;