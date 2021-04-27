const {
    post_subject,
    get_subjects,
    get_subject,
    update_subject
}=require("../Controllers/subject")

const express=require("express")

const router=express.Router()

router.post("/",async(req,res)=>await post_subject(req,res))

router.get("/",async(req,res)=>await get_subjects(req,res))

router.get("/:id",async(req,res)=>await get_subject(req,res))

router.put("/:id",async(req,res)=>await update_subject(req,res))

module.exports = router