const {
    post_category,
    get_category,
    update_category,
    get_categores
}=require("../Controllers/catergory")

const express=require("express")
const multer=require("multer")
const auth=require("../Middlewares/auth")
const admin=require("../Middlewares/admin")

const router=express.Router()
let upload = multer({ dest: "uploads/"});

router.post(
    "/",
    [auth,admin],
    upload.fields([{ name: "cover", maxCount: 1 }]),
    async (req,res)=>{

        req.body.cover=req.files["cover"][0].filename

        console.log(req.body)
        await post_category(req,res)
    } 
)

router.get("/:id",async(req,res)=>await get_category(req,res))

router.put(
    "/:id",
    [auth,admin],
    upload.fields([{ name: "cover", maxCount: 1 }]),
    async (req,res)=>{
        if(Object.keys(req.files).length!==undefined){
            if(Object.keys(req.files).length!==0){
                req.body.cover=req.files["cover"][0].filename
            }
        }
        await update_category(req,res)
    }
)

router.get("/",async(req,res)=>await get_categores(req,res))

module.exports = router