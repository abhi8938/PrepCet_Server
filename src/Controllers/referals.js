const {
    Referals,
    validate,
    validateUpdate
} =require("../Validators/referals")

const {Student}=require("../Validators/student")
const { handleUpdate } =require ("../Services/algo");

const post_referals=async(req,res)=>{
    const {error}=validate(req.body)
    if(error) throw new Error(error.details[0].message)
    let student = await Student.findById(req.user._id);
    if (!student)
        throw new Error("The Student with the given id is not available");
    req.body.STID=req.user._id;
    let refaral=new Referals(req.body)
    refaral=await refaral.save()
    res.status(200).send(refaral)
}

const get_referals=async(req,res)=>{
    let student = await Student.findById(req.user._id);
    if (!student)
        throw new Error("The Student with the given id is not available");
    
    let referals=await Referals.find({STID:req.user._id})
    res.status(200).send(referals)
    
}

const get_by_id=async(req,res)=>{
    let student = await Student.findById(req.user._id);
    if (!student)
        throw new Error("The Student with the given id is not available");
    
    let referal=await Referals.findOne({
        STID:req.user._id,
        _id:req.params.id
    })
    if(!referal)
        throw new Error("No referels based on this ID under your account")
    res.status(200).send(referal)
}

const update_referal=async(req,res)=>{
    const {error}=validateUpdate(req.body)
    if(error) throw new Error(error.details[0].message)
    let student = await Student.findById(req.user._id);
    if (!student)
        throw new Error("The Student with the given id is not available");

    let referal=await Referals.findOne({
        STID:req.user._id,
        _id:req.params.id
    })
    if(!referal)
        throw new Error("No referels based on this ID under your account")
    handleUpdate(referal,req.body)
    referal=await referal.save()

    res.status(200).send(referal)
}

module.exports = {
    post_referals,
    get_referals,
    get_by_id,
    update_referal
}