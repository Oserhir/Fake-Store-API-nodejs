const express = require("express");
const app = express();
const router = express.Router();

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

// all Brands
router.get("/", getBrands);

// get Brand
router.get("/:brandId", getBrand);

// Create Brand
router.post("/create/:userId", [requireSignIn, isAuth, isAdmin], createBrand);

// update Brand
router.put("/:brandId/:userId", [requireSignIn, isAuth, isAdmin], updateBrand);

// // Delete
router.delete(
  "/:brandId/:userId",
  [requireSignIn, isAuth, isAdmin],
  deleteBrand
);

router.param("userId", userById);
router.param("brandId", brandById);

module.exports = router;
