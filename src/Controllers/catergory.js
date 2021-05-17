const {
    validate,
    validateUpdate,
    Category
}=require("../Validators/catergory")
const {generateKeywords,handleUpdate}=require("../Services/algo")

const post_category=async(req,res)=>{
    console.log("Working yes")
    const {error}=validate(req.body)
    if(error) throw new Error(error.details[0].message)
    console.log("Working")
    let category=new Category(req.body)
    await category.save()
    res.status(200).send(category)
}

const get_category=async(req,res)=>{
    const category=await Category.findById(req.params.id)
    if(!category) throw new Error("No categoryes based on this Id")
    res.status(200).send(category) 
}

const update_category=async(req,res)=>{
    const category=await Category.findById(req.params.id)
    if(!category) throw new Error("No categoryes based on this Id")
    handleUpdate(category,req.body)
    await category.save()
    res.status(200).send(category)
}

const get_categores=async(req,res)=>{
    const categoryies=await Category.find(req.query)
    res.status(200).send(categoryies)
}

module.exports = {
    post_category,
    get_category,
    update_category,
    get_categores
}