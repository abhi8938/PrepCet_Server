const {
    del_vocab,
    get_vocabs,
    get_vocab,
    post_vocab      
}=require("../Controllers/vocab")

const express=require("express")
const auth=require("../Middlewares/auth")
const multer=require("multer")
const admin=require("../Middlewares/admin")

const router = express.Router();

router.post("/",[auth,admin],async(req,res)=>post_vocab(req,res))

router.get("/",async(req,res)=>await get_vocabs(req,res))

router.get("/:id",async(req,res)=>await get_vocab(req,res))

router.delete("/:id",[auth,admin],async(req,res)=>await del_vocab(req,res))

module.exports = router