const Joi=require("joi")
const mongoose=require("mongoose")
const DUR=require("./common")
const commentSchema = new mongoose.Schema({
    STID:{
        type:mongoose.Schema.ObjectId,
    },
    comment:{
        type:String,
        default:""
    },
    attachments:{
        type:[String],
        default:[]
    },
    upvote:{
        type:[mongoose.Schema.ObjectId],
        default:[]
    },
    downvote:{
        type:[mongoose.Schema.ObjectId],
        default:[]
    }
},{
    timestamps:true
})
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
    chapter_id:{
        type:mongoose.Schema.ObjectId
    },
    DUR:[DUR],
    resolved:{
        type:Boolean
    },
    solution_id:{
        type:mongoose.Schema.ObjectId
    },
    comments:{
        type:[commentSchema],
        default:[]
    }
},{
    timestamps:true
})

const Doubt=mongoose.model("Doubt",doubtSchema)

const validateComment=(comment)=>{
    const schema=Joi.object({
        comment:Joi.string(),
        attachments:Joi.array(),
    })

    return schema.validate(comment)
}

const validate=(doubt)=>{
    const schema=Joi.object({
        doubt:Joi.string().required(),
        attachments:Joi.array().required(),
        subject_id:Joi.string().required(),
        chapter_name:Joi.string().required(),
        resolved:Joi.boolean().required(),
        solution:Joi.string(),
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
        solution:Joi.string(),
    })

    return schema.validate(doubt)
}

module.exports={
    validate,
    validateUpdate,
    validateComment,
    Doubt
}