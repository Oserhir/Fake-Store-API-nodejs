const express = require("express");
const app = express();
const router = express.Router();
const { signUp_get, signup_post } = require("../controllers/userController");
const { userSignUpValidator } = require("../middlewares/userValidator");

router.get("/SignUp", signUp_get);
router.post("/SignUp", userSignUpValidator, signup_post);

module.exports = router;
