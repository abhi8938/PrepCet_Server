const Joi=require('joi')
const mongoose=require('mongoose')

const vocabSchema=new mongoose.Schema({
    title:{
        type:String
    },
    body:[{
        word:{
            type:String
        },
        definition:{
            type:String
        },
        usage:[String],
        pronunciation:{
            type:String
        }
    }]
},{
    timestamps:true
})

const Vocab=mongoose.model("Vocab",vocabSchema)

const bodySchema={
    word:Joi.string(),
    definition:Joi.string(),
    usage:Joi.array(),
    pronunciation:Joi.string()
}

const validate=(vocab)=>{
    const schema=Joi.object({
        title:Joi.string().required(),
        body:Joi.array().items(bodySchema),
    })

    return schema.validate(vocab)
}

module.exports = {
    Vocab,
    validate
}