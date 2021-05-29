const {
    Combo,
    validate,
    validateUpdate
}=require("../Validators/combos")
const {generateKeywords,handleUpdate}=require("../Services/algo")

const post_combo=async(req,res)=>{
    const {error}=validate(req.body)
    if(error) throw new Error(error.details[0].message)

    req.body.keywords=generateKeywords(req.body.name)
    let combo=new Combo(req.body)
    combo=await combo.save()

    res.status(200).send(combo)
}

const get_combos=async(req,res)=>{
    const combos=await Combo.find(req.query)
    res.status(200).send(combos)
}

const get_combo=async(req,res)=>{
    const combo=await Combo.findById(req.params.id)
    if(!combo) throw new Error("No combos based on this id")
    res.status(200).send(combo)
}

const update_combo=async(req,res)=>{
    const {error}=validateUpdate(req.body)
    if(error) throw new Error(error.details[0].message)

    const combo=await Combo.findById(req.params.id)
    if(!combo) throw new Error("No combos based on this id")

    if(req.body.name) req.body.keywords=generateKeywords(req.body.name)
    handleUpdate(combo,req.body)
    await combo.save()

    res.status(200).send(combo)
}

module.exports={
    post_combo,
    get_combos,
    get_combo,
    update_combo
}