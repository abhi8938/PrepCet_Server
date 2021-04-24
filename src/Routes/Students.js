//*Controller
const {
  authenticate,
  get_all,
  get_student,
  get_students,
  logoutfromdevice,
  post_student,
  reset_password,
  update_student,
  change_password,
} =require("../Controllers/students");

const auth=require("../Middlewares/auth")
const express=require("express")
const checkLogin=require("../Middlewares/checkLogin")

const router = express.Router();

router.put("/reset", async (req, res) => await reset_password(req, res));

router.put("/update_password",auth,async(req,res)=>await change_password(req,res));

router.get("/", async (req, res) => await get_students(req, res));

router.post("/", async (req, res) => await post_student(req, res));

router.put("/", auth, async (req, res) => await update_student(req, res));
router.get("/me", auth, async (req, res) => await get_student(req, res));

router.get("/all_data", auth, async (req, res) => await all_data(req, res));

router.post(
  "/authenticate",
  checkLogin,
  async (req, res) => await authenticate(req, res)
);

router.post(
  "/logout",
  auth,
  async (req, res) => await logoutfromdevice(req, res)
);

module.exports=router