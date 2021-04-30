const {
    validateUpdate,
    validate,
    Question
}=require("../Validators/question")
const {Subject}=require("../Validators/subject")
const { handleUpdate } =require ("../Services/algo");


const post_question=async(req,res)=>{
    const {error}=validate(req.body)
    if(error) throw new Error(error.details[0].message)

    const subject=await Subject.findById(req.body.subject_id)
    if(!subject) throw new Error("There are no subjects on this ID ,please upload the subject")
    req.body.subject_name=subject.name

    let question=new Question(req.body)
    question=await question.save()

    res.status(200).send(question)
}

const get_questions=async(req,res)=>{
    const question=await Question.find().sort('subject_name')
    res.status(200).send(question)
}

const get_question=async(req,res)=>{
    const question=await Question.findById(req.params.id)
    if(!question) throw new Error("No question on this id please try to upload the question")
    res.status(200).send(question)
}

const update_question=async(req,res)=>{
    const {error}=validateUpdate(req.body)
    if(error) throw new Error(error.details[0].message)

    let question=await Question.findById(req.params.id)
    if(!question) throw new Error("No question on this id please try to upload the question")

    if(req.body.subject_id){
        const subject=await Subject.findById(req.body.subject_id)
        if(!subject) throw new Error("There are no subjects on this ID ,please upload the subject")
        req.body.subject_name=subject.name
    }

    handleUpdate(question,req.body)
    question=await question.save()
    res.status(200).send(question)
}

module.exports = {
    post_question,
    get_questions,
    get_question,
    update_question
}