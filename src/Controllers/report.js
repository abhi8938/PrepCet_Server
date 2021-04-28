const {
    validateUpdate,
    validate,
    Report
}=require("../Validators/report")
const {Student}=require("../Validators/student")
const {handleUpdate}=require("../Services/algo")

const post_report=async(req,res)=>{
    const {error}=validate(req.body)
    if(error) throw new Error(error.details[0].message)

    let student=await Student.findById(req.user._id)
    if(!student)
        throw new Error("There is no user try to login to your acccout")

    req.body.STID=req.user._id
    let result=new Report(req.body)
    result=await result.save()

    res.status(200).send(result)
}

const get_reports=async(req,res)=>{
    let reports=await Report.find({STID:req.user._id})
    if(!reports)
        throw new Error("there are reports under this ID")

    res.status(200).send(reports)
}

const get_report=async(req,res)=>{
    let report=await Report.findOne({STID:req.user._id,_id:req.params.id})
    if(!report)
        throw new Error("there are no report based in this id")
    res.status(200).send(report)
}

const update_report=async(req,res)=>{
    const {error}=validateUpdate(req.body)
    if(error) throw new Error(error.details[0].message)

    let report=await Report.findOne({STID:req.user._id,_id:req.params.id})
    if(!report)
        throw new Error("there are no report based in this id")
    
    handleUpdate(report,req.body)
    report=await report.save()
    res.status(200).send(report)
}

module.exports = {
    post_report,
    get_reports,
    get_report,
    update_report
}