const {
    post_subject,
    get_subjects,
    get_subject,
    update_subject
}=require("../Controllers/subject")

const express=require("express")
const auth=require("../Middlewares/auth")
const admin=require("../Middlewares/admin")
const multer=require("multer")

const router=express.Router()
let upload = multer({ dest: "uploads/"});

router.post("/",
    [auth,admin],
    upload.fields([{name:'cover',maxCount:1}]),
    async(req,res)=>{

        req.body.cover=req.files["cover"][0].filename

        await post_subject(req,res)
    }
)

router.get("/",async(req,res)=>await get_subjects(req,res))

router.get("/:id",async(req,res)=>await get_subject(req,res))

router.put("/:id",
    [auth,admin],
    upload.fields([{name:'cover',maxCount:1}]),
    async(req,res)=>{
        if(Object.keys(req.files).length!==undefined){
            if(Object.keys(req.files).length!==0){
                if("cover" in req.files) req.body.cover=req.files["cover"][0].filename
            }
        }
        await update_subject(req,res)
    }
)

module.exports = router