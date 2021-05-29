const {
    validate,
    validateUpdate,
    Current
}=require("../Validators/current")

const post_current=async(req,res)=>{
    const {error}=validate(req.body)
    if(error) throw new Error(error.details[0].message)

    let current=new Current(req.body)
    current=await current.save()

    res.status(200).send(current)
}

const get_current=async(req,res)=>{
    const current=await Current.findById(req.params.id)
    if(!current) throw new Error("No currents are available based on this ID")
    res.status(200).send(current)
}

const get_currents=async(req,res)=>{
    const currents=await Current.find(req.query)
    res.status(200).send(currents)
}

const del_current=async(req,res)=>{
    const current=await Current.findById(req.params.id)
    if(!current) throw new Error("No currents are available based on this ID")
    await Current.findByIdAndDelete(req.params.id)
    res.status(200).send(current)
}

module.exports={
    post_current,
    get_currents,
    get_current,
    del_current
}