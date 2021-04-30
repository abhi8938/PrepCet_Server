const DUR =require("./common")
const Joi=require('joi')
const mongoose=require('mongoose')

const resultSchema=new mongoose.Schema({
    type:{
        type:String,
        enum:['CHAPTER','SUBJECT','PRACTICE']
    },
    duration:{
        type:Number,
    },
    subjectid:{
        type:mongoose.Schema.ObjectId
    },
    chapterid:{
        type:mongoose.Schema.ObjectId
    },
    reportid:{
        type:mongoose.Schema.ObjectId
    },
    keywords:[String],
    DUR:[DUR]
},{
    timestamps:true
})