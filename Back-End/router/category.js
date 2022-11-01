const express = require("express");
const app = express();
const router = express.Router();
const { createCategory } = require("../controllers/categoryController");
const { requireSignIn, isAuth, isAdmin } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");

// router.post("/create", requireSignIn, isAuth, isAdmin, createCategory);
router.post(
  "/create/:userId",
  [requireSignIn, isAuth, isAdmin],
  createCategory
);
router.param("userId", userById);

module.exports = router;
