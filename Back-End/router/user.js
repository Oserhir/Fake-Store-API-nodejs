const express = require("express");
const router = express.Router();
const { getOneUser_get } = require("../controllers/userController");
const { userById } = require("../middlewares/user");
const { requireSignIn, isAuth, isAdmin } = require("../middlewares/auth");

// router.get("/profile/:userId", requireSignIn, isAuth, getOneUser_get);
router.get("/profile/:userId", requireSignIn, isAuth, isAdmin, getOneUser_get);
router.param("userId", userById); // Any route contain "userId" my app will execute userByID()

module.exports = router;
