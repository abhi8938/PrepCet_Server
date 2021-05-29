const {
    post_order,
    get_orders,
    get_order
}=require("../Controllers/orders")

const auth=require("../Middlewares/auth")
const express=require("express")

const router = express.Router();

router.post("/",auth,async(req,res)=>await post_order(req,res))

router.get("/",auth,async(req,res)=>await get_orders(req,res))

router.get("/:id",auth,async(req,res)=>await get_order(req,res))

module.exports = router