const express = require("express");
const app = express();
const router = express.Router();
const {
  signupValidator,
  loginValidator,
} = require("../utils/validators/authValidators");
const { requireSignIn, isAuth } = require("../middlewares/auth");
const {
  signup_get,
  signup_post,
  login_get,
  login_post,
  signout_get,
  Hello_get,
} = require("../controllers/authController");

router.post("/signup", signupValidator, signup_post); // create a new user in db

router.post("/login", loginValidator, login_post); // authenticate a current user

router.get("/signout", signout_get); // log a user out

module.exports = router;
