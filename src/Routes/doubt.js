const {
    upload_doubt
}=require("../Controllers/doubt")

const auth=require("../Middlewares/auth")
const express=require("express")

const router = express.Router();

router.post("/",auth,async(req, res)=>await upload_doubt(req,res))

module.exports = router