const express = require("express");
const app = express();
const router = express.Router();

const {
  getSpecifiqueCategoriesValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidators");

const subcategoriesRoute = require("./subcategory");
const productsRoute = require("../router/products");

// @desc Get All Subcategories for Specific Category ( Nested Route )
// @desc Create Subcategory on Category ( Nested Route )
router.use("/:categoryId/subcategories", subcategoriesRoute);
// @desc Get all products by category
router.use("/:categoryId/products", productsRoute);

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

const { userById } = require("../middlewares/user");
const { isAuth, requireLogIn, allowedTo } = require("../middlewares/auth");

// @desc Create a category
// @access Private/Admin
router.post(
  "/",
  [requireLogIn, allowedTo("admin")],
  uploadCategoryImage,
  resizeImage,
  createCategoryValidator,
  createCategory
);

// @desc Get all categories
// @access Public
router.get("/", allCategories);

// @desc Get a single category
// @access Public
router.get("/:id", getSpecifiqueCategoriesValidator, getCategory);

// @desc Update a category
// @access Private/Admin
router.put(
  "/:id",
  [requireLogIn, allowedTo("admin")],
  uploadCategoryImage,
  resizeImage,
  updateCategoryValidator,
  updateCategory
);

// @desc Delete a category
// @access Private/Admin
router.delete(
  "/:id",
  [requireLogIn, allowedTo("admin")],
  deleteCategoryValidator,
  deleteCategory
);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
