//*Controller
const {
  cancel_payment,
  get_payment,
  post_payment,
  update_payment,
} =require("../Controllers/Payments");

const admin=require("../Middlewares/admin")
const auth=require("../Middlewares/auth")
const express=require("express")

const router = express.Router();

router.get("/",auth, async (req, res) => await get_payment(req, res));

router.post("/",auth, async (req, res) => await post_payment(req, res));

router.put("/:id",auth, async (req, res) => await update_payment(req, res));

router.post("/cancel",auth, async (req, res) => await cancel_payment(req, res));

module.exports=router