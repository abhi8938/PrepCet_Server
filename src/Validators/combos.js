const Joi=require('joi')
const mongoose=require('mongoose')
const DUR=require("./common")

const comboSchema=new mongoose.Schema({
    name:{
        type:String
    },
    life:{
        type:Number
    },
    type:{
        type:String,
        enum:['CHAPTER','CATEGORY']
    },
    included_products:[{
        type:{
            type:String,
            enum:['LECTURE','MOCK_TEST','CONTENT']
        },
        quantity:{
            type:Number
        }
    }],
    keywords:[String],
    DUR:[DUR],
    price:{
        type:Number
    },
    unlimited:{
        type:Boolean,
        default:false
    }
})

const Combo=mongoose.model("Combo",comboSchema)

const included_products_validate={
    type:Joi.string().valid('LECTURE','MOCK_TEST','CONTENT'),
    quantity:Joi.number()
}

const validate=(combo)=>{
    const schema=Joi.object({
        name:Joi.string().required(),
        life:Joi.number(),
        type:Joi.string(),
        included_products:Joi.array().items(included_products_validate).required(),
        price:Joi.number(),
        unlimited:Joi.boolean()
    })

    return schema.validate(combo)
}

const validateUpdate=(combo)=>{
    const schema=Joi.object({
        name:Joi.string(),
        life:Joi.number(),
        type:Joi.string(),
        included_products:Joi.array().items(included_products_validate),
        price:Joi.number(),
        unlimited:Joi.boolean()
    })

    return schema.validate(combo)
}

module.exports={
    Combo,
    validate,
    validateUpdate
}