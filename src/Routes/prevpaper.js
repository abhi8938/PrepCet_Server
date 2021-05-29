const {
    post_prevpapers,
    get_prevpaper,
    get_prevpapers,
    del_prevpapers
}=require("../Controllers/prevpaper")

const express=require("express")
const auth=require("../Middlewares/auth")
const multer=require("multer")
const admin=require("../Middlewares/admin")

const router = express.Router();

router.post("/",
    [auth,admin],
    async (req,res)=>{
        await post_prevpapers(req,res)
    }
)

router.get("/",async(req,res)=>await get_prevpapers(req,res))

router.get("/:id",async(req,res)=>await get_prevpaper(req,res))

router.delete("/:id",[auth,admin],async(req,res)=>await del_prevpapers(req,res))

module.exports = router