const {
    post_lecture,
    get_lecture,
    get_lectures,
    update_lecture
}=require("../Controllers/lectures")

const express=require("express")
const auth=require("../Middlewares/auth")
const multer=require("multer")
const admin=require("../Middlewares/admin")

const router = express.Router();
let upload = multer({ dest: "uploads/"});

router.post("/",
    [auth,admin],
    upload.fields([{name:"link",maxCount:1},{name:"cover",maxCount:1}]),
    async(req,res)=>{
        if(Object.keys(req.files).length!==undefined){
            if(Object.keys(req.files).length!==0){
                if("link" in req.files) req.body.link=req.files.link[0].filename
                if("cover" in req.files) req.body.cover=req.files.cover[0].filename
            }
        }
        await post_lecture(req,res)
    }
)

router.get("/:id",
    async (req,res)=>{
        await get_lecture(req,res)
    }
)

router.get("/",async (req,res)=>await get_lectures(req,res))

router.put("/:id",
    [auth,admin],
    upload.fields([{name:"link",maxCount:1}]),
    async (req,res)=>{
        if(Object.keys(req.files).length!==undefined){
            if(Object.keys(req.files).length!==0){
                if("link" in req.files) req.body.link=req.files.link[0].filename
            }
        }
        await update_lecture(req,res)
    }
)

module.exports = router