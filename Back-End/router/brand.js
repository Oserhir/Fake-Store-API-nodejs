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
} = require("../controllers/brandController");
const { requireSignIn, isAuth, isAdmin } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");

// Get List of Brands
router.get("/", getBrands);

// Get specific Brand
router.get("/:brandId", getSpecifiqueBrandValidator, getBrand);

// Add new Brand
router.post(
  "/create/:userId",
  [requireSignIn, isAuth, isAdmin],
  createBrandValidator,
  createBrand
);

// Update specific Brand
router.put(
  "/:brandId/:userId",
  [requireSignIn, isAuth, isAdmin],
  updateBrandValidator,
  updateBrand
);

// Delete specific Brand
router.delete(
  "/:brandId/:userId",
  [requireSignIn, isAuth, isAdmin],
  deleteBrandValidator,
  deleteBrand
);

router.param("userId", userById);
router.param("brandId", brandById);

module.exports = router;
