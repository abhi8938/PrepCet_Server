const {
    upload_post,
    get_posts,
    get_post,
    update_post
}=require("../Controllers/posts")
const express=require("express")
const multer=require("multer")

const router=express.Router()

let upload = multer({ dest: "uploads/"});

router.post("/",
    upload.fields([{ name: "image", maxCount: 1 }]),
    async(req,res)=>{
        req.body.image=req.files['image'][0].filename
        await upload_post(req,res)
    }
)

router.get("/",async(req,res)=>await get_posts(req,res))

router.get("/:id",async(req,res)=>await get_post(req,res))

router.put("/:id",
    upload.fields([{ name: "image", maxCount: 1 }]),
    async(req,res)=>{
    console.log(req.files)
    if(req.files.length!==undefined){
    if(req.files.length!==0){
        req.body.image=req.files['image'][0].filename
    }
    }
    await update_post(req,res)
})

module.exports = router