const Joi=require('joi')
const mongoose=require('mongoose')

const prevpaperSchema=new mongoose.Schema({
    name:{
        type:String
    },
    year:{
        type:Number
    },
    category_id:{
        type:mongoose.Schema.ObjectId
    },
    questions:[{
        type:mongoose.Schema.ObjectId
    }],
    keywords:[String]
},{
    timestamps:true
})

const Prevpaper=mongoose.model('Prevpaper',prevpaperSchema)

const validate=(prevpaper)=>{
    const schema=Joi.object({
        name:Joi.string(),
        year:Joi.number(),
        category_id:Joi.string(),
        questions:Joi.array() 
    })

    return schema.validate(prevpaper)
}

module.exports = {
    validate,
    Prevpaper
}