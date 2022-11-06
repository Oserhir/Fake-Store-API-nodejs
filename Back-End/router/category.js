const express = require("express");
const app = express();
const router = express.Router();
const {
  allCategories,
  getCategory,
  createCategory,
  categoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { requireSignIn, isAuth, isAdmin } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");

// allCategories
router.get("/", allCategories);

// showCategory
router.get("/:categoryId", getCategory);

// Create
router.post(
  "/create/:userId",
  [requireSignIn, isAuth, isAdmin],
  createCategory
);
// update
router.put(
  "/:categoryId/:userId",
  [requireSignIn, isAuth, isAdmin],
  updateCategory
);

// Delete
router.delete(
  "/:categoryId/:userId",
  [requireSignIn, isAuth, isAdmin],
  deleteCategory
);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
