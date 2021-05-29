const {
    post_offer,
    get_offer,
    get_offers
}=require("../Controllers/offer")

const auth=require("../Middlewares/auth")
const admin=require("../Middlewares/admin")
const express=require("express")

const router = express.Router();

router.post("/",[auth,admin],async (req, res)=>await post_offer(req, res))

router.get("/",async (req, res)=>await get_offers(req, res))

router.get("/:id",async (req, res)=>await get_offer(req, res))

module.exports = router