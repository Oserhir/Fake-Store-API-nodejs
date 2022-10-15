const express = require("express");
const app = express();
const router = express.Router();
const {
  signup_get,
  signup_post,
  login_get,
  login_post,
  signout_get,
} = require("../controllers/userController");

router.get("/signup", signup_get);
router.post("/signup", signup_post);

router.get("/login", login_get);
router.post("/Login", login_post);

router.get("/signout", signout_get);

module.exports = router;
