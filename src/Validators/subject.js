const Joi=require("joi")
const mongoose=require("mongoose")
const DUR=require("./common")

const subjectSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    cover:{
        type:String
    },
    description:{
        type:String
    },
    category_id:{
        type:mongoose.Schema.ObjectId,
    },
    DUR:[DUR],
    keywords:[String]
},{
    timestamps:true
})

const Subject=mongoose.model("Subject",subjectSchema)

const validate=(subject)=>{
    const schema=Joi.object({
        name:Joi.string().required(),
        cover:Joi.string(),
        description:Joi.string(),
        category_id:Joi.string().required(),
    })

    return schema.validate(subject)
}

const validateUpdate=(subject)=>{
    const schema=Joi.object({
        name:Joi.string(),
        cover:Joi.string(),
        description:Joi.string(),
        category_id:Joi.string()
    })

    return schema.validate(subject)
}

module.exports = {
    Subject,
    validate,
    validateUpdate
}