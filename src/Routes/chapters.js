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
const admin=require("../Middlewares/admin")

const router=express.Router()
let upload = multer({ dest: "uploads/"});

function findnames(list){
    newList=[]
    list.forEach(val=>{
        newList.push(val.filename)
    })
    return newList
}

router.post(
    "/",
    [auth,admin],
    upload.fields([{ name: "ebook" },{ name: "lecture" }]),
    async (req,res)=>{

        req.body.ebook=findnames(req.files.ebook) 
        req.body.lecture=findnames(req.files.lecture)
        

        await post_chapter(req,res)
    } 
)

router.get("/",async (req,res)=>await get_chapters(req,res))

router.get("/:id",async(req,res)=>await get_chapter(req,res))

router.put(
    "/:id",
    [auth,admin],
    upload.fields([{ name: "ebook" },{ name: "video"}]),
    async(req,res)=>{
        if(Object.keys(req.files).length!==undefined){
            if(Object.keys(req.files).length!==0){
                if("ebook" in req.files) req.body.ebook=findnames(req.files.ebook) 
                if("video" in req.files) req.body.lecture=findnames(req.files.lecture)
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