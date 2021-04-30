const Joi=require("joi")
const mongoose=require("mongoose")
const DUR=require("./common")

const doubtSchema=new mongoose.Schema({
    STID:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    doubt:{
        type:String
    },
    attachments:[String],
    subject_id:{
        type:mongoose.Schema.ObjectId
    },
    chapter_name:{
        type:String
    },
    DUR:[DUR],
    resolved:{
        type:Boolean
    },
    solution:{
        type:String
    }
},{
    timestamps:true
})

const Doubt=mongoose.model("Doubt",doubtSchema)

const validate=(doubt)=>{
    const schema=Joi.object({
        doubt:Joi.string().required(),
        attachments:Joi.array().required(),
        subject_id:Joi.string().required(),
        chapter_name:Joi.string().required(),
        resolved:Joi.boolean().required(),
        solution:Joi.string()
    })

    return schema.validate(doubt)
}

const validateUpdate=(doubt)=>{
    const schema=Joi.object({
        doubt:Joi.string(),
        attachments:Joi.array(),
        subject_id:Joi.string(),
        chapter_name:Joi.string(),
        resolved:Joi.boolean(),
        solution:Joi.string()
    })

    return schema.validate(doubt)
}

module.exports={
    validate,
    validateUpdate,
    Doubt
}