const {
    post_order
}=require("../Controllers/orders")

const auth=require("../Middlewares/auth")
const express=require("express")

const router = express.Router();

router.post("/",auth,async(req,res)=>await post_order(req,res))

module.exports = router