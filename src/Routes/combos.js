const {
    post_combo,
    get_combos,
    get_combo,
    update_combo
}=require("../Controllers/combos")

const express=require("express")
const auth=require("../Middlewares/auth")
const multer=require("multer")
const admin=require("../Middlewares/admin")

const router = express.Router();

router.post("/",
    [auth,admin],
    async (req, res)=>await post_combo(req,res)
)

router.get("/",
    async (req, res)=>await get_combos(req,res)
)

router.get("/:id",async (req, res)=>await get_combo(req,res))

router.put("/:id",
    [auth,admin],
    async (req, res)=>await update_combo(req,res)
)

module.exports = router