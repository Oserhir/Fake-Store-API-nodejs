const express = require("express");
const app = express();
const router = express.Router();
const { requireSignIn, isAuth } = require("../middlewares/auth");
const {
  signup_get,
  signup_post,
  login_get,
  login_post,
  signout_get,
  Hello_get,
} = require("../controllers/authController");

router.get("/signup", signup_get); // sign up page
router.post("/signup", signup_post); // create a new user in db

router.get("/login", login_get); // log in page
router.post("/Login", login_post); // authenticate a current user

router.get("/signout", signout_get); // log a user out

module.exports = router;
