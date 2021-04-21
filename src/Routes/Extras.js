//*Controller
const {
  get_bmessage,
  get_legal,
  post_bmessage,
  post_code,
  post_legal,
  post_mail,
  post_sms,
  update_bmessage,
  update_legal,
} =require( "../Controllers/extras");

const admin=require("../Middlewares/admin")
const auth=require("../Middlewares/auth")
const express=require("express")
const fileUpload=require("../Middlewares/fileUpload")
const multer=require("multer")

const router = express.Router();
let upload = multer({ dest: "uploads/" });

/*
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 */

//* BMESSAGES

router.get(
  "/bmessage",
  [auth, admin],
  async (req, res) => await get_bmessage(req, res)
);

router.post(
  "/bmessage",
  [auth, admin],
  async (req, res) => await post_bmessage(req, res)
);

// router.put(
//   "/bmessage/:id",
//   [auth, admin],
//   async (req, res) => await update_bmessage(req, res)
// );

/*
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 */

//* Programs


/*
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 */

//* Legals

router.get("/legals/:id", auth, async (req, res) => await get_legal(req, res));

router.post(
  "/legals",
  [auth, admin],
  async (req, res) => await post_legal(req, res)
);

router.put(
  "/legals/:id",
  [auth, admin],
  async (req, res) => await update_legal(req, res)
);

/*
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 */

//* SendMail / sendMessage
router.post("/sendCode", async (req, res) => await post_code(req, res));
router.post("/sendSMS", async (req, res) => await post_sms(req, res));
router.post("/sendMail", auth, async (req, res) => await post_mail(req, res));

module.exports=router;

/*
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 */

//* University


