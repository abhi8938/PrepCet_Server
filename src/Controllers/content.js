const {
    validateUpdate,
    validate,
    Content
}=require("../Validators/content")

const post_content=async(req,res)=>{
    const {error}=validate(req.body)
    if(error) throw new Error(error.details[0].message)

    let content=new Content(req.body)
    content=await content.save()

    res.status(200).send(content)
}

const get_contents=async(req,res)=>{
    const contents=await Content.find(req.query)
    res.status(200).send(contents)
}

const get_content=async(req,res)=>{
    const content=await Content.findById(req.params.id)
    if(!content) throw new Error("No contents based on this id")
    res.status(200).send(content)
}

const del_content=async(req,res)=>{
    const content=await Content.findById(req.params.id)
    if(!content) throw new Error("No contents based on this id")
    await Content.findByIdAndDelete(req.params.id)
    res.status(200).send(content)
}

module.exports={
    post_content,
    get_content,
    get_contents,
    del_content 
}