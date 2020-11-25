const Joi = require('joi');
Joi.objectID = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    
    item: {
        type: new mongoose.Schema({
            name:{
                type: String,
                minlength:3,
                maxlength:255,
                required:true,
                trim:true   
            },
            saleprice:{
                type:Number,
                min:5,
                required:true,
                max:100000
            },
        }),
        required: true
    }
});

const Cart = mongoose.model('Cart', cartSchema);

function validatingPurchasingItem(item) {
    
    const schema = Joi.object({
        itemID : Joi.objectID().required()
    });

    const validation = schema.validate(item);
    return validation;
}

module.exports.Cart = Cart;
module.exports.cartSchema = cartSchema;
module.exports.validatingPurchasingItem = validatingPurchasingItem;
