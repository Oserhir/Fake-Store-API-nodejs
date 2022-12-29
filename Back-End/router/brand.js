const express = require("express");
const app = express();
const router = express.Router();

const {
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
  getSpecifiqueBrandValidator,
} = require("../utils/validators/BrandValidators");

// const subcategoriesRoute = require("./subcategory");
// router.use("/:categoryId/subcategories", subcategoriesRoute);

const {
  getBrand,
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
  brandById,
  uploadBrandImage,
  resizeImage,
} = require("../controllers/brandController");
// const { requireSignIn, isAuth, isAdmin } = require("../middlewares/auth");
const { isAuth, requireLogIn, allowedTo } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");

// Get List of Brands
router.get("/", getBrands);

// Get specific Brand
router.get("/:id", getSpecifiqueBrandValidator, getBrand);

// Add new Brand
router.post(
  "/",
  [requireLogIn, allowedTo("admin")],
  uploadBrandImage,
  resizeImage,
  createBrandValidator,
  createBrand
);

// Update specific Brand
router.put(
  "/:id",
  [requireLogIn, allowedTo("admin")],
  uploadBrandImage,
  resizeImage,
  updateBrandValidator,
  updateBrand
);

// Delete specific Brand
router.delete(
  "/:id",
  [requireLogIn, allowedTo("admin")],
  deleteBrandValidator,
  deleteBrand
);

// router.param("userId", userById);
// router.param("brandId", brandById);

module.exports = router;
