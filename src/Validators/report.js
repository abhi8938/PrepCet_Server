const Joi=require("joi")
const mongoose=require("mongoose")
const DUR=require("./common")

const reportSchema=new mongoose.Schema({
    type:{
        type:String,
        required: true,
        enum:['CHAPTER','SUBJECT','PRACTICE']
    },
    duration:{
        type:Number,
        required: true
    },
    subjectid:{
        type:mongoose.Schema.ObjectId
    },
    chapterid:{
        type:mongoose.Schema.ObjectId
    },
    results:[{
        question:{
            type:mongoose.Schema.ObjectId
        },
        correct:{
            type:Boolean
        }
    }],
    DUR:[DUR],
    STID:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    maximum_marks:{
        type:Number,
        required:true
    },
    total_marks:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})

const Report=mongoose.model("Result",reportSchema)

const validate=(result)=>{
    const schema=Joi.object({
        type:Joi.string().valid('CHAPTER','SUBJECT','PRACTICE'),
        duration:Joi.number().required(),
        subjectid:Joi.string().required(),
        chapterid:Joi.string().required(),
        results:Joi.array().required(),
        maximum_marks:Joi.number().required(),
        total_marks:Joi.number().required(),
    })

    return schema.validate(result)
}

const validateUpdate=(result)=>{
    const schema=Joi.object({
        type:Joi.string(),
        duration:Joi.number(),
        subjectid:Joi.string(),
        chapterid:Joi.string(),
        results:Joi.array(),
        maximum_marks:Joi.number(),
        total_marks:Joi.number(),
    })

    return schema.validate(result)
}

module.exports = {
    validateUpdate,
    validate,
    Report
}
