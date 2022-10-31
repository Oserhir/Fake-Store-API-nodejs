const express = require("express");
const router = express.Router();
const { getOneUser_get } = require("../controllers/userController");
const { userById } = require("../middlewares/user");
const { requireSignIn, isAuth } = require("../middlewares/auth");

// router.get("/profile/:userId", requireSignIn, isAuth, getOneUser_get);
router.get("/profile/:userId", requireSignIn, getOneUser_get);
router.param("userId", userById);

module.exports = router;
