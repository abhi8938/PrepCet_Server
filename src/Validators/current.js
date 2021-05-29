const Joi=require('joi')
const mongoose=require('mongoose')

const currentSchema=new mongoose.Schema({
    cover:{
        type:String
    },
    title:{
        type:String,
        required:true
    },
    body:{
        type:String
    }
},{
    timestamps:true
})

const Current=mongoose.model("Current",currentSchema)

const validate=(current)=>{
    const schema=Joi.object({
        cover:Joi.string(),
        title:Joi.string().required(),
        body:Joi.string()
    })

    return schema.validate(current)
}

const validateUpdate=(current)=>{
    const schema=Joi.object({
        cover:Joi.string(),
        title:Joi.string(),
        body:Joi.string()
    })

    return schema.validate(current)
}

module.exports = {
    validate,
    validateUpdate,
    Current
}