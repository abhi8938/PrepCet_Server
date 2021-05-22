const Joi=require("joi")
const mongoose=require("mongoose")
const DUR=require("./common")

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
    },
    cover:{
        type:String
    },
    active:{
        type:Boolean
    },
    DUR:[DUR],
},{
    timestamps:true
})

const Category=mongoose.model("Category",categorySchema)

const validate=(category)=>{
    const schema=Joi.object({
        name:Joi.string().required(),
        cover:Joi.string(),
        active:Joi.boolean(),
    })
    return schema.validate(category)
}

const validateUpdate=(category)=>{
    const schema=Joi.object({
        name:Joi.string(),
        cover:Joi.string(),
        active:Joi.boolean(),
    })
    return schema.validate(category)
}

module.exports = {
    validate,
    validateUpdate,
    Category
}