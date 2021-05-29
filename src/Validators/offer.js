const Joi=require('joi')
const mongoose=require('mongoose')

const offerSchema=new mongoose.Schema({
    name:{
        type:String
    },
    code:{
        type:String
    },
    expiration:{
        type:Date
    },
    active:{
        type:Boolean
    }
},{
    timestamps:true
})

const Offer=mongoose.model("Offer",offerSchema)

const validate=(offer)=>{
    const schema=Joi.object({
        name:Joi.string(),
        code:Joi.string(),
        expiration:Joi.date(),
        active:Joi.boolean()
    })
    return schema.validate(offer)
}

module.exports = {
    Offer,
    validate
}