const Joi=require("joi")
const mongoose=require("mongoose")
const DUR=require("./common")

const subjectSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    chapters:{
        type:[String],
        default:[]
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
        chapters: Joi.array().required()
    })

    return schema.validate(subject)
}

const validateUpdate=(subject)=>{
    const schema=Joi.object({
        name:Joi.string(),
        chapters: Joi.array()
    })

    return schema.validate(subject)
}

module.exports = {
    Subject,
    validate,
    validateUpdate
}