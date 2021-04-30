const {
    post_question,
    get_questions,
    get_question,
    update_question
}=require("../Controllers/question")

const express=require("express")

const router = express.Router();

router.post("/",async(req,res)=>await post_question(req,res))

router.get("/",async(req,res)=>await get_questions(req,res))

router.get("/:id",async(req,res)=>await get_question(req,res))

router.put("/:id",async(req,res)=>await update_question(req,res))

module.exports = router