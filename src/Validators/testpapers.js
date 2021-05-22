const Joi=require('joi')
const mongoose=require('mongoose')

const testpaperSchema=new mongoose.Schema({
    chapter_id:{
        type:mongoose.Schema.ObjectId
    },
    subject_id:{
        type:mongoose.Schema.ObjectId
    },
    category_id:{
        type:mongoose.Schema.ObjectId
    },
    name:{
        type:String
    },
    questions:[{
        type:mongoose.Schema.ObjectId
    }],
    price:{
        type:Number,
        default:0
    },
    type:{
        type:String,
        enum:['CATEGORY','CHAPTER']
    },
    daily:{
        type:Boolean,
    },
    keywords:[String]
},{
    timestamps:true
})

const Testpaper=mongoose.model("Testpaper",testpaperSchema)

const validate=(testpaper)=>{
    const schema=Joi.object({
        chapter_id:Joi.string(),
        subject_id:Joi.string(),
        category_id:Joi.string(),
        name:Joi.string(),
        questions:Joi.array(),
        price:Joi.number(),
        type:Joi.string().valid('CATEGORY','CHAPTER'),
        daily:Joi.boolean()
    })

    return schema.validate(testpaper)
}

const validateUpdate=(testpaper)=>{
    const schema=Joi.object({
        chapter_id:Joi.string(),
        subject_id:Joi.string(),
        category_id:Joi.string(),
        name:Joi.string(),
        questions:Joi.array(),
        price:Joi.number(),
        type:Joi.string().valid('CATEGORY','CHAPTER'),
        daily:Joi.boolean()
    })

    return schema.validate(testpaper)
}

module.exports = {
    validate,
    validateUpdate,
    Testpaper
}