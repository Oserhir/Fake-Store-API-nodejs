const express = require("express");
const app = express();
const router = express.Router();
const {
  signupValidator,
  loginValidator,
} = require("../utils/validators/authValidators");

const {
  signup_get,
  signup_post,
  login_get,
  login_post,
  signout_get,
  Hello_get,
} = require("../controllers/authController");

// create a new user in db  @access	Public
router.post("/signup", signupValidator, signup_post);

// authenticate a current user @access	Public
router.post("/login", loginValidator, login_post);

// log a user out @access	Private/User
router.get("/signout", signout_get);

module.exports = router;
