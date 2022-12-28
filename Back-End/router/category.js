const express = require("express");
const app = express();
const router = express.Router();

const {
  getSpecifiqueCategoriesValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidators");

// Nested Route
const subcategoriesRoute = require("./subcategory");
router.use("/:categoryId/subcategories", subcategoriesRoute);

const {
  allCategories,
  getCategory,
  createCategory,
  categoryById,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  resizeImage,
} = require("../controllers/categoryController");
// const { requireSignIn, isAuth, isAdmin } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");

const { isAuth, requireLogIn, allowedTo } = require("../middlewares/auth");

// Get List of Categories
router.get("/", allCategories);

// Get specific Category
router.get("/:categoryId", getSpecifiqueCategoriesValidator, getCategory);

// Add new Category
// router.post(
//   "/create/:userId",
//   [requireSignIn, isAuth, isAdmin],
//   uploadCategoryImage,
//   resizeImage,
//   createCategoryValidator,
//   createCategory
// );

// @desc Add new Category @access Private/Admin
router.post(
  "/",
  [requireLogIn, allowedTo("admin")],
  uploadCategoryImage,
  resizeImage,
  createCategoryValidator,
  createCategory
);

// Update specific Category
router.put(
  "/:categoryId/:userId",
  // [requireSignIn, isAuth, isAdmin],
  uploadCategoryImage,
  resizeImage,
  updateCategoryValidator,
  updateCategory
);

// Delete specific Category
router.delete(
  "/:categoryId/:userId",
  // [requireSignIn, isAuth, isAdmin],
  deleteCategoryValidator,
  deleteCategory
);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
