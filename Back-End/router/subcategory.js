const express = require("express");
const app = express();

const {
  deleteSubCategoryValidator,
  updateSubCategoryValidator,
  createSubCategoryValidator,
  getSpecifiqueCategoriesValidator,
} = require("../utils/validators/subCategoryValidators");

// mergeParams: Allow us to access parameters on other routers
// We need to access categoryId from category router
const router = express.Router({ mergeParams: true });

const {
  getsubCategories,
  getsubCategory,
  createsubCategory,
  subCategoryById,
  updatesubCategory,
  deleteSubCategory,
  setCategoryTobody,
} = require("../controllers/subcategoryController");

const { categoryById } = require("../controllers/categoryController");

const { userById } = require("../middlewares/user");
const { isAuth, requireLogIn, allowedTo } = require("../middlewares/auth");

// @desc Create Subcategory
// @access Private/Admin
router.post(
  "/",
  [requireLogIn, allowedTo("admin")],
  setCategoryTobody,
  createSubCategoryValidator,
  createsubCategory
);

// @desc Update specific subCategory
// @access Private/Admin
router.put(
  "/:id",
  [requireLogIn, allowedTo("admin")],
  updateSubCategoryValidator,
  updatesubCategory
);

// @desc Delete specific subCategory
// @access Private/Admin
router.delete(
  "/:id",
  [requireLogIn, allowedTo("admin")],
  deleteSubCategoryValidator,
  deleteSubCategory
);

// @desc Get List of subCategories
// @access Public
router.get("/", getsubCategories);

// @desc Get specific subCategory
router.get("/:subcategoryId", getsubCategory);

router.param("subcategoryId", subCategoryById);

module.exports = router;
