const express = require("express");
const app = express();
const router = express.Router();

const {
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
  getSpecifiqueBrandValidator,
} = require("../utils/validators/BrandValidators");

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

const { isAuth, requireLogIn, allowedTo } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");

// @desc Get List of Brands
// @access Public
router.get("/", getBrands);

// @desc Get specific Brand
// @access Public
router.get("/:id", getSpecifiqueBrandValidator, getBrand);

//  @desc  Add new Brand
//  @access Private/Admin
router.post(
  "/",
  [requireLogIn, allowedTo("admin")],
  uploadBrandImage,
  resizeImage,
  createBrandValidator,
  createBrand
);

// @desc Update specific Brand
// @access Private/Admin
router.put(
  "/:id",
  [requireLogIn, allowedTo("admin")],
  uploadBrandImage,
  resizeImage,
  updateBrandValidator,
  updateBrand
);

//  @desc Delete specific Brand
//  @access Private/Admin
router.delete(
  "/:id",
  [requireLogIn, allowedTo("admin")],
  deleteBrandValidator,
  deleteBrand
);

module.exports = router;
