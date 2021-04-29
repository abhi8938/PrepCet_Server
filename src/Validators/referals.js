const mongoose = require('mongoose')
const Joi=require('joi')
const DUR =require("./common")

const referalSchema=new mongoose.Schema({
    STID:{
        type:mongoose.Schema.ObjectId,
        required:true,
    },
    balance:{
        type:Number,
        required:true
    },
    limit:{
        type:Number,
        required:true
    },
    transactions:{
        type:String,
        enum: ["C" , "D" , "CREDIT" , "DEBIT"],
    },
    amount:{
        type:Number,
        required:true
    },
    DUR:[DUR]
},{
    timestamps:true,
})

const Referals=mongoose.model("Referals",referalSchema)

const validate=(referal)=>{
    const schema=Joi.object({
        balance:Joi.number().required(),
        limit:Joi.number().required(),
        transactions:Joi.string(),
        amount:Joi.number().required(),
    })

    return schema.validate(referal)
}

const validateUpdate=(referal)=>{
    const schema=Joi.object({
        balance:Joi.number(),
        limit:Joi.number(),
        transactions:Joi.string(),
        amount:Joi.number(),
    })

    return schema.validate(referal)
}

module.exports={
    Referals,
    validate,
    validateUpdate
}