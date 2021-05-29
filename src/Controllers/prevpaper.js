const {
    validate,
    Prevpaper
}=require("../Validators/prevpaper")
const {generateKeywords}=require("../Services/algo")

const post_prevpapers=async(req,res)=>{
    const {error}=validate(req.body)
    if(error) throw new Error(error.details[0].message)

    req.body.keywords=generateKeywords(req.body.name)
    let prevpapers=new Prevpaper(req.body)
    prevpapers=await prevpapers.save()

    res.status(200).send(prevpapers)
}

const get_prevpaper=async(req,res)=>{
    const prevpaper=await Prevpaper.findById(req.params.id)
    if(!prevpaper) throw new Error("No prevp papers based on this ID")
    res.status(200).send(prevpaper)
}

const get_prevpapers=async(req,res)=>{
    const prev_papers=await Prevpaper.find(req.query)
    res.status(200).send(prev_papers)
}

const del_prevpapers=async(req,res)=>{
    const prevpaper=await Prevpaper.findById(req.params.id)
    if(!prevpaper) throw new Error("No prevp papers based on this ID")
    await Prevpaper.findByIdAndDelete(req.params.id)
    res.status(200).send(prevpaper)
}

module.exports = {
    post_prevpapers,
    get_prevpaper,
    get_prevpapers,
    del_prevpapers
}