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
  apicredits,
  apiwallet,
  addbookmark,
  getBookmarks,
  delBookmarks,
  uploadTranscations,
  readTransactions,
  getBookmark,
  getTransaction,
  post_history,
  get_histories,
  get_history,
  del_history
} =require("../Controllers/students");

const auth=require("../Middlewares/auth")
const admin=require("../Middlewares/admin")
const express=require("express")
const checkLogin=require("../Middlewares/checkLogin")

const router = express.Router();

router.put("/reset", async (req, res) => await reset_password(req, res));

router.put("/update_password",auth,async(req,res)=>await change_password(req,res));

router.get("/", async (req, res) => await get_students(req, res));

router.post("/", async (req, res) => await post_student(req, res));

router.put("/", auth, async (req, res) => await update_student(req, res));
router.get("/me", auth, async (req, res) => await get_student(req, res));

// router.get("/all",[auth,admin],async(req,res)=>await get_all(req,res))

router.post("/history",auth,async(req,res)=>await post_history(req,res))

router.get("/history",auth,async(req,res)=>await get_histories(req,res))

router.get("/history/:id",auth,async(req,res)=>await get_history(req,res))

router.delete("/history/:id",auth,async(req,res)=>await del_history(req,res))

router.post("/authenticate",checkLogin,async (req, res) => await authenticate(req, res));

router.post("/logout",auth,async (req, res) => await logoutfromdevice(req, res));

router.post("/credits",auth,async(req,res)=>await apicredits(req,res))

router.post("/wallet",auth,async(req,res)=>await apiwallet(req,res))

router.post("/bookmark",auth,async(req,res)=>await addbookmark(req,res))

router.get("/bookmark",auth,async(req,res)=>await getBookmarks(req,res))

router.get("/bookmark/:id",auth,async(req,res)=>await getBookmark(req,res))

router.delete("/bookmark/:id",auth,async(req,res)=>await delBookmarks(req,res))

router.post("/transaction",auth,async(req,res)=>await uploadTranscations(req,res))

router.get("/transaction",auth,async(req,res)=>await readTransactions(req,res))

router.get("/transaction/:id",auth,async(req,res)=>await getTransaction(req,res))

module.exports=router