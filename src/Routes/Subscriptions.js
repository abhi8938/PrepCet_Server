//*Controller
const {
  get_subscription,
  get_subscriptions,
  post_subscription,
  update_subscription,
}= require("../Controllers/subscriptions");

const admin=require("../Middlewares/admin")
const auth=require("../Middlewares/auth")
const express=require("express")

const router = express.Router();

router.get(
  "/",
  [auth, admin],
  async (req, res) => await get_subscriptions(req, res)
);

router.post("/", auth, async (req, res) => await post_subscription(req, res));

router.put(
  "/me",
  auth,
  async (req, res) => await update_subscription(req, res)
);

router.get("/me", auth, async (req, res) => await get_subscription(req, res));

module.exports=router;