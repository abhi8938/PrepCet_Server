const {
    post_referals,
    get_referals,
    get_by_id,
    update_referal
}=require("../Controllers/referals")

const auth=require("../Middlewares/auth")
const express=require("express")

const router=express.Router();

router.post("/",auth,async(req,res)=>await post_referals(req,res));

router.get("/",auth,async(req,res)=>await get_referals(req,res));

router.get("/:id",auth,async(req,res)=>await get_by_id(req,res))

router.put("/:id",auth,async(req,res)=>await update_referal(req,res))

module.exports=router;