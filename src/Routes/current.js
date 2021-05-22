const {
    post_current,
    get_currents,
    get_current,
    del_current
}=require("../Controllers/current")

const express=require("express")
const auth=require("../Middlewares/auth")
const multer=require("multer")
const admin=require("../Middlewares/admin")

const router = express.Router();
let upload = multer({ dest: "uploads/"});

router.post("/",
    [auth,admin],
    upload.fields([{name:'cover',maxCount:1}]),
    async(req,res)=>{
        if(Object.keys(req.files).length!==undefined){
            if(Object.keys(req.files).length!==0){
                if("cover" in req.files) req.body.cover=req.files.cover[0].filename;
            }
        }
        await post_current(req,res)
    }
)

router.get("/",async(req,res)=>await get_currents(req,res))

router.get("/:id",async(req,res)=>await get_current(req,res))

router.delete("/:id",[auth,admin],async(req,res)=>await del_current(req,res))

module.exports = router