const {
    post_content,
    get_contents,
    get_content,
    del_content
}=require("../Controllers/content")

const express=require("express")
const auth=require("../Middlewares/auth")
const multer=require("multer")
const admin=require("../Middlewares/admin")

const router = express.Router();
let upload = multer({ dest: "uploads/"});

router.post("/",
    [auth,admin],
    upload.fields([{name:'link',maxCount:1}]),
    async(req,res)=>{
        if(Object.keys(req.files).length!==undefined){
            if(Object.keys(req.files).length!==0){
                if("link" in req.files) req.body.link=req.files.link[0].filename;
            }
        }
        await post_content(req,res)
    }
)

router.get("/",async(req,res)=>await get_contents(req,res))

router.get("/:id",async(req,res)=>await get_content(req,res))

router.delete("/:id",
    [auth,admin],
    async(req,res)=>await del_content(req,res)
)

module.exports = router