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
} = require("../Controllers/extras");

const admin = require("../Middlewares/admin");
const auth = require("../Middlewares/auth");
const express = require("express");
const fileUpload = require("../Middlewares/fileUpload");
const multer = require("multer");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("../Services/googleAuth");
require("../Services/facebookAuth");
const { Student } = require("../Validators/student");

const router = express.Router();
let upload = multer({ dest: "uploads/" });

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

router.post("/sendCode", async (req, res) => await post_code(req, res));
router.post("/sendSMS", async (req, res) => await post_sms(req, res));
router.post("/sendMail", auth, async (req, res) => await post_mail(req, res));

router.use(
  cookieSession({
    name: "tuto-session",
    keys: ["key1", "key2"],
  })
);

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

router.use(passport.initialize());
router.use(passport.session());

router.get(
  "/failed",
  async (req, res) => await res.send("You Failed to log in!")
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/api/extras/failed" }),
  async function (req, res) {
    console.log("google", req, res);
    res.status(200).send(req.user._json.authtoken);
  }
);

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/api/extras/failed" }),
  async function (req, res) {
    console.log("facebook", req, res);
    res.status(200).send(req.user._json);
  }
);

module.exports = router;
