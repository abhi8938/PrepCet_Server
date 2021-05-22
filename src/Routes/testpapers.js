const {
    post_testpaper,
    get_testpapers,
    get_testpaper,
    del_testpaper
}=require("../Controllers/testpapers")

const express=require("express")
const auth=require("../Middlewares/auth")
const admin=require("../Middlewares/admin")

const router = express.Router();

router.post("/",[auth,admin],async (req,res)=>await post_testpaper(req,res))

router.get("/",async(req,res)=>await get_testpapers(req,res))

router.get("/:id",async(req,res)=>await get_testpaper(req,res))

router.delete("/:id",
    [auth,admin],
    async(req,res)=>{
        await del_testpaper(req,res)
    }
)


module.exports = router