const Joi=require('joi')
const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
    STID:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    type:{
        type:String,
        enum:['COMBO','SINGLE']
    },
    ide:{
        type:mongoose.Schema.ObjectId
    },
    productname:{
        type:String
    },
    category:{
        type:mongoose.Schema.ObjectId
    },
    subject:{
        type:mongoose.Schema.ObjectId
    },
    quantity:{
        type:Number
    },
    expiration:{
        type:Date,
        default:Date.now()
    },
    final_amount:{
        type:Number
    },
    discount:{
        type:Number
    },
    transaction_id:{
        type:mongoose.Schema.ObjectId
    }
})

const Order=mongoose.model("Order",orderSchema)

const validate=(order)=>{
    const schema=Joi.object({
        type:Joi.string().valid('COMBO','SINGLE'),
        ide:Joi.string(),
        productname:Joi.string(),
        category:Joi.string(),
        subject:Joi.string(),
        quantity:Joi.number(),
        expiration:Joi.date(),
        final_amount:Joi.number(),
        discount:Joi.number(),
        transaction_id:Joi.string()
    })
    return schema.validate(order)
}

module.exports={
    Order,
    validate
}