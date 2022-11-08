const express = require("express");
const app = express();
const router = express.Router();

const {
  getsubCategories,
  getsubCategory,
  createsubCategory,
  subCategoryById,
  updatesubCategory,
  deleteSubCategory,
} = require("../controllers/subcategoryController");

const { requireSignIn, isAuth, isAdmin } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");

// // allsubCategories
router.get("/", getsubCategories);

//  Get specific subCategory
router.get("/:subcategoryId", getsubCategory);

// Create subCategory
router.post(
  "/create/:userId",
  [requireSignIn, isAuth, isAdmin],
  createsubCategory
);

// update
router.put(
  "/:subcategoryId/:userId",
  [requireSignIn, isAuth, isAdmin],
  updatesubCategory
);

// Delete
router.delete(
  "/:subcategoryId/:userId",
  //[requireSignIn, isAuth, isAdmin],
  deleteSubCategory
);

router.param("userId", userById);
router.param("subcategoryId", subCategoryById);

module.exports = router;
