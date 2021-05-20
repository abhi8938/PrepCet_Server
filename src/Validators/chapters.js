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
    ebook:{
        type:[String]
    },
    lecture:{
        type:[String]
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
        chapter_no:Joi.number(),
        ebook:Joi.array().required(),
        lecture:Joi.array().required(),
    })

    return schema.validate(chapter)
}

const validateUpdate=(chapter)=>{
    const schema=Joi.object({
        name:Joi.string(),
        description:Joi.string(),
        subject_id:Joi.string(),
        chapter_no:Joi.number(),
        ebook:Joi.array(),
        lecture:Joi.array()
    })

    return schema.validate(chapter)
}

module.exports = {
    Chapter,
    validate,
    validateUpdate
}