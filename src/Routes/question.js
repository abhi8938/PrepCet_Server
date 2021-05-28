const {
    post_question,
    get_questions,
    get_question,
    update_question,
    delete_question
}=require("../Controllers/question")

const express=require("express")
const auth=require("../Middlewares/auth")
const multer=require("multer")
const admin=require("../Middlewares/admin")

const router = express.Router();
let upload = multer({ dest: "uploads/"});
let i;

function findnames(list){
    newList=[]
    list.forEach(val=>{
        newList.push(val.filename)
    })
    return newList
}

router.post("/",
    [auth,admin],
    upload.fields([{name:'attachments'},{name:'answers'}]),
    // upload.array('answers'),
    async(req,res)=>{
        console.log(req.body)
        res.send({"Body":req.body,"Files":req.files})

        // if(Object.keys(req.files).length!==undefined){
        //     if(Object.keys(req.files).length!==0){
        //         if("attachments" in req.files) req.body.attachments=findnames(req.files.attachments) 
        //     }
        // }
        // await post_question(req,res)
    }
)

router.get("/",async(req,res)=>await get_questions(req,res))

router.get("/:id",async(req,res)=>await get_question(req,res))

router.put("/:id",[auth,admin],async(req,res)=>await update_question(req,res))

router.delete("/:id",[auth,admin],async(req,res)=>await delete_question(req,res))

module.exports = router