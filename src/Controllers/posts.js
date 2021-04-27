const {
    Post,
    validate,
    validateUpdate
}=require("../Validators/posts")
const {generateKeywords,handleUpdate}=require("../Services/algo")

const upload_post=async(req,res)=>{
    const {error}=validate(req.body)
    if(error) throw new Error(error.details[0].message)

    let post=new Post(req.body)
    let keywords=generateKeywords(
        req.body.post
    )
    post.keywords=keywords
    post=await post.save()
    res.status(200).send(post)
}

const get_posts=async(req,res)=>{
    const posts=await Post.find().sort('post')
    res.status(200).send(posts)
}

const get_post=async(req,res)=>{
    const post=await Post.findById(req.params.id)
    if(!post) throw new Error("They are no posts related to this ID")
    res.status(200).send(post)
}

const update_post=async(req,res)=>{
    const {error}=validateUpdate(req.body)
    if(error) throw new Error(error.details[0].message)

    let post=await Post.findById(req.params.id)
    if(!post) throw new Error("Posts are not available based in this ID")

    if(req.body.post){
        req.body.keywords=generateKeywords(req.body.post)
    }

    handleUpdate(post,req.body)
    post=await post.save()
    res.status(200).send(post)
}

module.exports={
    upload_post,
    get_posts,
    get_post,
    update_post
}