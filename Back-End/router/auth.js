const express = require("express");
const app = express();
const router = express.Router();
const { requireSignIn } = require("../middlewares/auth");
const {
  signup_get,
  signup_post,
  login_get,
  login_post,
  signout_get,
  Hello_get,
} = require("../controllers/authController");

router.get("/signup", signup_get);
router.post("/signup", signup_post);

router.get("/login", login_get);
router.post("/Login", login_post);

router.get("/signout", signout_get);

//  The “/Hello” route only be accessible when the user is logged in.
router.get("/Hello", requireSignIn, Hello_get);

module.exports = router;
