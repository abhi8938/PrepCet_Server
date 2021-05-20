const {
    post_question,
    get_questions,
    get_question,
    update_question
}=require("../Controllers/question")

const express=require("express")
const auth=require("../Middlewares/auth")
const multer=require("multer")
const admin=require("../Middlewares/admin")

const router = express.Router();
let upload = multer({ dest: "uploads/"});
let i;

router.post("/",
    [auth,admin],
    upload.fields([{name:'attachments'},{name:`options`}]),
    // upload.array('options'),
    async(req,res)=>{
        console.log(req.files)
        console.log(req.body)
        res.send({"Body":req.body,"Files":req.files})
        // await post_question(req,res)
    }
)

router.get("/",async(req,res)=>await get_questions(req,res))

router.get("/:id",async(req,res)=>await get_question(req,res))

router.put("/:id",[auth,admin],async(req,res)=>await update_question(req,res))

//delete route

module.exports = router