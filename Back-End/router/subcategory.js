const express = require("express");
const app = express();

const {
  deleteSubCategoryValidator,
  updateSubCategoryValidator,
  createSubCategoryValidator,
  getSpecifiqueCategoriesValidator,
} = require("../utils/validators/subCategoryValidators");

// mergeParams: Allow us to access parameters on other routers
// ex: We need to access categoryId from category router
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

// const { requireSignIn, isAuth, isAdmin } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");
const { isAuth, requireLogIn, allowedTo } = require("../middlewares/auth");

// @desc Create Subcategory
// @access Private/Admin
router.post(
  "/",
  [requireLogIn, allowedTo("admin")],
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

// Method #2 - Create subCategory
// router.post(
//   "/",
//   setCategoryTobody,
//   createSubCategoryValidator,
//   createsubCategory
// );

// Delete specific subCategory
router.delete(
  "/:subcategoryId/:userId",
  //[requireSignIn, isAuth, isAdmin],
  //deleteSubCategoryValidator,
  deleteSubCategory
);

// Get List of subCategories
router.get("/", getSpecifiqueCategoriesValidator, getsubCategories);

//  Get specific subCategory
router.get("/:subcategoryId", getsubCategory);

router.param("userId", userById);
router.param("subcategoryId", subCategoryById);
router.param("categoryId", categoryById);

module.exports = router;
