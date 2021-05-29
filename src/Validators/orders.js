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
    productName:{
        type:String
    },
    category:{
        type:mongoose.Schema.ObjectId
    },
    subject:{
        type:mongoose.Schema.ObjectId
    },
    quantity:{
        type:mongoose.Schema.ObjectId
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
    transactionId:{
        type:mongoose.Schema.ObjectId
    }
})

const Order=mongoose.model("Order",orderSchema)

const validate=(order)=>{
    const schema=Joi.object({
        type:Joi.string().valid('COMBO','SINGLE'),
        ide:Joi.string(),
        productName:Joi.string(),
        category:Joi.string(),
        subject:Joi.string(),
        quantity:Joi.string(),
        expiration:Joi.date(),
        final_amount:Joi.number(),
        discount:Joi.number(),
        transactionId:Joi.string()
    })
}

module.exports={
    Order,
    validate
}