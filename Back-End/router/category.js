const express = require("express");
const app = express();
const router = express.Router();

// mergeParams: Allow us to access parameters on other routers
// ex: We need to access categoryId from category router
const subcategoriesRoute = require("./subcategory");

// Get All Subcategories for Specific Category
// Create Subcategory on Category
router.use("/:categoryId/subcategories", subcategoriesRoute);

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

// Get List of Categories
router.get("/", allCategories);

// Get specific Category
router.get("/:categoryId", getCategory);

// Add new Category
router.post(
  "/create/:userId",
  [requireSignIn, isAuth, isAdmin],
  createCategory
);

// Update specific Category
router.put(
  "/:categoryId/:userId",
  [requireSignIn, isAuth, isAdmin],
  updateCategory
);

// Delete specific Category
router.delete(
  "/:categoryId/:userId",
  [requireSignIn, isAuth, isAdmin],
  deleteCategory
);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
