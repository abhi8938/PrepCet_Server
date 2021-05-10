const {
    validate,
    validateUpdate,
    validateComment,
    Doubt
}=require("../Validators/doubt")
const { handleUpdate } =require ("../Services/algo");
const {Student}=require("../Validators/student")

const upload_doubt=async(req,res)=>{
    const {error}=validate(req.body)
    if(error) throw new Error(error.details[0].message)

    let student=await Student.findById(req.user._id)
    if (!student)
    throw new Error(
      "The student with givern id in not present OR wrong student doc id"
    );

    req.body.STID=req.user._id
    let doubt=new Doubt(req.body)
    doubt=await doubt.save()

    res.status(200).send(doubt)
}

const get_doubt=async(req,res)=>{
    const doubt =await Doubt.findById(req.params.id)
    if(!doubt) throw new Error("They are no doubts under this id")
    res.status(200).send(doubt)
}

const get_doubts=async(req,res)=>{
    const doubts=await Doubt.find()
    res.status(200).send(doubts)
}

const update_doubt=async(req,res)=>{
    const {error}=validateUpdate(req.body)
    if(error) throw new Error(error.details[0].message)

    let student=await Student.findById(req.user._id)
    if(!student) throw new Error("There is no user based on this ID")
    
    let doubt=await Doubt.findOne({STID:req.user._id,_id:req.params.id})
    if(!doubt) throw new Error("There is no doubts based on this ID or you are not allowed to update this")
    
    handleUpdate(doubt,req.body)
    doubt=await doubt.save()
    
    res.status(200).send(doubt)
}

const add_comment=async(req,res)=>{
    const {error}=validateComment(req.body)
    if(error) throw new Error(error.details[0].message)

    let student=await Student.findById(req.user._id)
    if(!student) throw new Error("There is no user based on this ID")

    let doubt=await Doubt.findById(req.params.id)
    if(!doubt) throw new Error("There is no doubts based on this ID or you are not allowed to update this")

    doubts=doubt.comments
    doubts.push({
        STID:req.user._id,
        attachments:req.body.attachments,
        comment:req.body.comment
    })
    body={
        comments:doubts
    }

    handleUpdate(doubt,body)
    await doubt.save()
    res.status(200).send(doubt)
}

const delete_comment=async(req,res)=>{
    let student=await Student.findById(req.user._id)
    if(!student) throw new Error("There is no user based on this ID")

    let doubt=await Doubt.findById(req.params.id)
    if(!doubt) throw new Error("There is no doubts based on this ID or you are not allowed to update this")

    let comments=doubt.comments
    comments = comments.filter(item => String(item._id) !== req.params.ide)

    body={
        comments:comments
    }

    handleUpdate(doubt,body)
    await doubt.save()
    res.status(200).send(doubt)
}

module.exports={
    upload_doubt,
    update_doubt,
    get_doubts,
    get_doubt,
    add_comment,
    delete_comment
}