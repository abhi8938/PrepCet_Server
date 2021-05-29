const DUR =require("./common")
const Joi=require('joi')
const mongoose=require('mongoose')

const lectureSchema=new mongoose.Schema({
    chapter_id:{
        type:mongoose.Schema.ObjectId
    },
    subject_id:{
        type:mongoose.Schema.ObjectId
    },
    category_id:{
        type:mongoose.Schema.ObjectId
    },
    link:{
        type:String
    },
    price:{
        type:Number,
        default:0
    },
    cover:{
        type:String
    },
    DUR:[DUR],
    daily:{
        type:Boolean,
    }
},{
    timestamps:true
})

const Lecture=mongoose.model("Lecture",lectureSchema)

const validate=(lecture)=>{
    const schema=Joi.object({
        chapter_id:Joi.string(),
        subject_id:Joi.string(),
        link:Joi.string(),
        daily:Joi.boolean(),
        prince:Joi.number(),
        category_id:Joi.string(),
        cover:Joi.string()
    })

    return schema.validate(lecture)
}

const validateUpdate=(lecture)=>{
    const schema=Joi.object({
        chapter_id:Joi.string(),
        subject_id:Joi.string(),
        category_id:Joi.string(),
        link:Joi.string(),
        daily:Joi.boolean(),
        prince:Joi.number(),
        cover:Joi.string()
    })

    return schema.validate(lecture)
}

module.exports = {
    validate,
    validateUpdate,
    Lecture
}