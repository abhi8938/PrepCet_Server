const {
    validate,
    validateUpdate,
    Lecture
}=require("../Validators/lectures")
const { handleUpdate } =require ("../Services/algo");

const post_lecture=async(req,res)=>{
    const {error}=validate(req.body)
    if(error) throw new Error(error.details[0].message)

    let lecture=new Lecture(req.body)
    lecture=await lecture.save()

    res.status(200).send(lecture)
}

const get_lecture=async (req,res)=>{
    let lecture=await Lecture.findById(req.params.id)
    res.status(200).send(lecture)
}

const get_lectures=async(req,res)=>{
    let lectures=await Lecture.find(req.query)
    res.status(200).send(lectures)
}

const update_lecture=async(req,res)=>{
    const {error}=validateUpdate(req.body)
    if(error) throw new Error(error.details[0].message)

    let lecture=await Lecture.findById(req.params.id)
    if(!lecture) throw new Error("No lectures are based on this ID")

    handleUpdate(lecture,req.body)
    lecture=await lecture.save()
    res.status(200).send(lecture)
}

module.exports = {
    post_lecture,
    get_lecture,
    get_lectures,
    update_lecture
}