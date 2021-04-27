const Joi=require('joi');
const mongoose=require("mongoose")
const DUR=require('./common')

const postSchema=new mongoose.Schema({
    author:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    post:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    keywords:[String],
    DUR:[DUR],
    subject_id:{
        type:mongoose.Schema.ObjectId,
        required:true
    }
},{
    timestamps:true
})

const Post=mongoose.model("Post",postSchema)

const validate=(post)=>{
    const schema=Joi.object({
        author:Joi.string().required(),
        post:Joi.string().required(),
        image:Joi.string().required(),
        subject_id:Joi.string().required()
    })

    return schema.validate(post)
}

const validateUpdate=(post)=>{
    const schema=Joi.object({
        author:Joi.string(),
        post:Joi.string(),
        image:Joi.string(),
        subject_id:Joi.string()
    })

    return schema.validate(post)
}

module.exports={
    Post,
    validate,
    validateUpdate
}