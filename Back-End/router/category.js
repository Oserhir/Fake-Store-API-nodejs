const express = require("express");
const app = express();
const router = express.Router();
const {
  createCategory,
  categoryById,
  showCategory,
} = require("../controllers/categoryController");
const { requireSignIn, isAuth, isAdmin } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");

// router.post("/create", requireSignIn, isAuth, isAdmin, createCategory);
router.post(
  "/create/:userId",
  [requireSignIn, isAuth, isAdmin],
  createCategory
);

router.get("/:categoryId", showCategory);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
