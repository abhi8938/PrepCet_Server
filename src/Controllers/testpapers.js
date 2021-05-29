const {
    validate,
    validateUpdate,
    Testpaper
}=require("../Validators/testpapers")
const {generateKeywords}=require("../Services/algo")

const post_testpaper=async(req,res)=>{
    const {error}=validate(req.body)
    if(error) throw new Error(error.details[0].message)

    req.body.keywords=generateKeywords(req.body.name)
    
    let testpaper=new Testpaper(req.body)
    testpaper=await testpaper.save()

    res.status(200).send(testpaper)
}

const get_testpapers=async(req,res)=>{
    const testpapers=await Testpaper.find(req.query)
    res.status(200).send(testpapers)
}

const get_testpaper=async(req,res)=>{
    const testpaper=await Testpaper.findById(req.params.id)
    if(!testpaper) throw new Error("No test papers are based on this id")
    res.status(200).send(testpaper)
}

const del_testpaper=async(req,res)=>{
    const testpaper=await Testpaper.findById(req.params.id)
    if(!testpaper) throw new Error("No test papers are based on this id")
    await Testpaper.findByIdAndDelete(req.params.id)
    res.status(200).send(testpaper)
}

module.exports={
    post_testpaper,
    get_testpapers,
    get_testpaper,
    del_testpaper
}