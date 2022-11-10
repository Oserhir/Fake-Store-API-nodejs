const express = require("express");
const app = express();

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

const { requireSignIn, isAuth, isAdmin } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");

// Get List of subCategories
router.get("/", getsubCategories);

//  Get specific subCategory
router.get("/:subcategoryId", getsubCategory);

// Add new subCategory
router.post(
  "/create/:userId",
  [requireSignIn, isAuth, isAdmin],
  createsubCategory
);

// Method #2 - Create subCategory
router.post("/", setCategoryTobody, createsubCategory);

// Update specific subCategory
router.put(
  "/:subcategoryId/:userId",
  [requireSignIn, isAuth, isAdmin],
  updatesubCategory
);

// Delete specific subCategory
router.delete(
  "/:subcategoryId/:userId",
  [requireSignIn, isAuth, isAdmin],
  deleteSubCategory
);

router.param("userId", userById);
router.param("subcategoryId", subCategoryById);
router.param("categoryId", categoryById);

module.exports = router;
