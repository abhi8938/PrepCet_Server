const DUR =require("./common")
const Joi=require('joi')
const mongoose=require('mongoose')

const questionSchema=new mongoose.Schema({
    subject_name:{
        type:String,
        required:true,
    },
    chapter_id:{
        type:mongoose.Schema.ObjectId
    },
    subject_id:{
        type:mongoose.Schema.ObjectId
    },
    question:{
        type:String
    },
    options:[{
        option:{
            type:String
        },
        correct:{
            type:Boolean,
        }
    }],
    solution:{
        type:String
    },
    DUR:[DUR]
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
    })

    return schema.validate(question)
}

module.exports = {
    validateUpdate,
    validate,
    Question
}