const {
    post_chapter,
    get_chapters,
    get_chapter,
    update_chapter,
    video_stream
}=require("../Controllers/chapters")
const auth=require("../Middlewares/auth")

const express=require("express")
const multer=require("multer")

const router=express.Router()
let upload = multer({ dest: "uploads/"});

router.post(
    "/",
    auth,
    upload.fields([{ name: "ebook", maxCount: 1 },{ name: "video", maxCount: 1 }]),
    async (req,res)=>{

        req.body.ebook=req.files["ebook"][0].filename
        req.body.video=req.files["video"][0].filename

        await post_chapter(req,res)
    } 
)

router.get("/",async (req,res)=>await get_chapters(req,res))

router.get("/:id",async(req,res)=>await get_chapter(req,res))

router.put(
    "/:id",
    auth,
    upload.fields([{ name: "ebook", maxCount: 1 },{ name: "video", maxCount: 1 }]),
    async(req,res)=>{
        if(Object.keys(req.files).length!==undefined){
            if(Object.keys(req.files).length!==0){
                if("ebook" in req.files) req.body.ebook=req.files["ebook"][0].filename
                if("video" in req.files) req.body.video=req.files["video"][0].filename
            }
        }
        // console.log(req.files)
        // console.log(req.body)
        await update_chapter(req,res)
    }

)

router.get(
    "/stream/:id",
    async(req,res)=>{
        await video_stream(req,res)
    }
)

module.exports = router