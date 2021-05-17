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
    subject_id:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    chapter_no:{
        type:Number
    },
    ebook:{
        type:String
    },
    video:{
        type:String
    },
    DUR:[DUR]
})

const Chapter=mongoose.model("Chapter",chapterSchema)

const validate=(chapter)=>{
    const schema=Joi.object({
        name:Joi.string().required(),
        description:Joi.string(),
        subject_id:Joi.string().required(),
        chapter_no:Joi.number(),
        ebook:Joi.string().required(),
        video:Joi.string().required(),
    })

    return schema.validate(chapter)
}

const validateUpdate=(chapter)=>{
    const schema=Joi.object({
        name:Joi.string(),
        description:Joi.string(),
        subject_id:Joi.string(),
        chapter_no:Joi.number(),
        ebook:Joi.string(),
        video:Joi.string()
    })

    return schema.validate(chapter)
}

module.exports = {
    Chapter,
    validate,
    validateUpdate
}