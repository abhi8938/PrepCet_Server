//*Controller
const {
  get_package,
  get_packages,
  post_package,
  update_package,
} =require("../Controllers/packages");

const admin=require("../Middlewares/admin")
const auth=require("../Middlewares/auth")
const express=require("express")

const router = express.Router();

router.get("/", async (req, res) => await get_packages(req, res));

router.post(
  "/",
  // [auth, admin],
  async (req, res) => await post_package(req, res)
);

router.put(
  "/:id",
  // [auth, admin],
  async (req, res) => await update_package(req, res)
);

router.get("/:id", async (req, res) => await get_package(req, res));

module.exports=router
