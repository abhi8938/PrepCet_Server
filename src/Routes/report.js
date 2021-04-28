const {
    post_report,
    get_reports,
    get_report,
    update_report
}=require("../Controllers/report")

const auth=require("../Middlewares/auth")
const express=require("express")

const router = express.Router();

router.post("/",auth,async (req, res)=>await post_report(req,res))

router.get("/",auth,async(req,res)=>await get_reports(req,res))

router.get("/:id",auth,async(req,res)=>await get_report(req,res))

router.put("/:id",auth,async(req,res)=>await update_report(req,res))

module.exports = router