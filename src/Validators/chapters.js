const Joi=require("joi")
const mongoose=require("mongoose")
const DUR=require("./common")

const chapterSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    category_id:{
        type:mongoose.Schema.ObjectId,
    },
    subject_id:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    num:{
        type:Number
    },
    DUR:[DUR],
    keywords:[String]
},{
    timestamps:true
})

const Chapter=mongoose.model("Chapter",chapterSchema)

const validate=(chapter)=>{
    const schema=Joi.object({
        name:Joi.string().required(),
        description:Joi.string(),
        subject_id:Joi.string().required(),
        num:Joi.number(),
        category_id:Joi.string().required(),
    })

    return schema.validate(chapter)
}

const validateUpdate=(chapter)=>{
    const schema=Joi.object({
        name:Joi.string(),
        description:Joi.string(),
        subject_id:Joi.string(),
        num:Joi.number(),
        category_id:Joi.string(),
    })

    return schema.validate(chapter)
}

module.exports = {
    Chapter,
    validate,
    validateUpdate
}