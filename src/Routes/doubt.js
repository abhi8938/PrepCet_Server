const {
    upload_doubt,
    update_doubt,
    get_doubts,
    get_doubt
}=require("../Controllers/doubt")

const auth=require("../Middlewares/auth")
const express=require("express")

const router = express.Router();

router.post("/",auth,async(req, res)=>await upload_doubt(req,res))

router.get("/:id",auth,async(req,res)=>await get_doubt(req,res))

router.get("/",auth,async(req,res)=>await get_doubts(req,res))

router.put("/:id",auth,async(req,res)=>await update_doubt(req,res))

module.exports = router