const {
    upload_doubt,
    update_doubt,
    get_doubts,
    get_doubt,
    add_comment,
    delete_comment
}=require("../Controllers/doubt")

const auth=require("../Middlewares/auth")
const express=require("express")
const multer=require("multer")

const router = express.Router();
let upload = multer({ dest: "uploads/"});

function findnames(list){
    newList=[]
    list.forEach(val=>{
        newList.push(val.filename)
    })
    return newList
}

router.post("/",auth,
    upload.array('attachments'),
    async(req,res)=>{
        req.body.attachments=findnames(req.files)
        await upload_doubt(req,res)
    }
)

router.get("/:id",async(req,res)=>await get_doubt(req,res))

router.get("/",async(req,res)=>await get_doubts(req,res))

router.put(
    "/:id",auth,
    upload.array('attachments'),
    async(req,res)=>{
        if(req.files.length!==undefined){
            if(req.files.length!==0){
                req.body.attachments=findnames(req.files)
            }
        }
        await update_doubt(req,res)
    }
)

router.post(
    "/comment/:id",auth,
    upload.array('attachments'),
    async(req,res)=>{
        if(req.files.length!==undefined){
            if(req.files.length!==0){
                req.body.attachments=findnames(req.files)
            }
        }
        await add_comment(req,res)
    }
)

router.delete(
    "/:id&:ide",auth,
    async(req,res)=>{
        await delete_comment(req,res)
    }
)

module.exports = router