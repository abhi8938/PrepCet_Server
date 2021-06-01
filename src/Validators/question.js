const DUR =require("./common")
const Joi=require('joi')
const mongoose=require('mongoose')

const questionSchema=new mongoose.Schema({
    question:{
        type:String
    },
    testpaper_id:{
        type:mongoose.Schema.ObjectId
    },
    attachments:[String],
    options:[{
        option:{
            type:String
        },
        correct:{
            type:Boolean,
        },
        type:{
            type:String,
            enum:['file','text']
        }
    }],
    solution:{
        type:String
    },
    DUR:[DUR],
    keywords: [String],
},{
    timestamps:true
})

const Question=mongoose.model("Question",questionSchema)

const validate=(question)=>{
    const schema=Joi.object({
        chapter_id:Joi.string().required(),
        subject_id:Joi.string().required(),
        question:Joi.string().required(),
        options:Joi.array().required(),
        solution:Joi.string().required(),
        attachments:Joi.array(),
        testpaper_id:Joi.string()
    })

    return schema.validate(question)
}

const validateUpdate=(question)=>{
    const schema=Joi.object({
        chapter_id:Joi.string(),
        subject_id:Joi.string(),
        question:Joi.string(),
        options:Joi.array(),
        solution:Joi.string(),
        attachments:Joi.array(),
        testpaper_id:Joi.string()
    })

    return schema.validate(question)
}

module.exports = {
    validateUpdate,
    validate,
    Question
}