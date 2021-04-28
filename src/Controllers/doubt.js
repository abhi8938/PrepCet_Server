const {
    validate,
    validateUpdate,
    Doubt
}=require("../Validators/doubt")
const { handleUpdate } =require ("../Services/algo");
const {Student}=require("../Validators/student")

const upload_doubt=async(req,res)=>{
    const {error}=validate(req.body)
    if(error) throw new Error(error.details[0].message)

    let student=await Student.findById(req.user._id)
    if(!student) throw new Error("There is no user based on this ID")

    req.body.STID=req.user._id
    let doubt=new Doubt(req.body)
    doubt=await doubt.save()

    res.status(200).send(doubt)
}

module.exports={
    upload_doubt
}