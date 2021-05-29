const Joi=require('joi')
const mongoose=require('mongoose')

const contentSchema=new mongoose.Schema({
    chapter_id:{
        type:mongoose.Schema.ObjectId
    },
    subject_id:{
        type:mongoose.Schema.ObjectId
    },
    link:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

const Content=mongoose.model("Content",contentSchema)

const validate=(content)=>{
    const schema=Joi.object({
        chapter_id:Joi.string(),
        subject_id:Joi.string(),
        link:Joi.string(),
        price:Joi.number()
    })

    return schema.validate(content)
}

const validateUpdate=(content)=>{
    const schema=Joi.object({
        chapter_id:Joi.string(),
        subject_id:Joi.string(),
        link:Joi.string(),
        price:Joi.number()
    })

    return schema.validate(content)
}

module.exports={
    validateUpdate,
    validate,
    Content
}