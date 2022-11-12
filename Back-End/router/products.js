const express = require("express");
const router = express.Router();
const {
  searchProduct,
  listRelated,
  getProducts,
  createProduct,
  getProduct,
  productById,
  removeProduct,
  updateProduct,
  uploadProductImages,
  resizeProductImage,
} = require("../controllers/productController");

const {
  createProductValidator,
} = require("../utils/validators/productValidators");

const { requireSignIn, isAuth, isAdmin } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");

// Add new product
router.post(
  "/create/:userId",
  [requireSignIn, isAuth, isAdmin],
  uploadProductImages,
  resizeProductImage,
  createProductValidator,
  createProduct
);

// Update a product
router.put(
  "/:productId/:userId",
  // upload.single("image"),
  [requireSignIn, isAuth, isAdmin],
  updateProduct
);

// Delete a product
router.delete(
  "/:productId/:userId",
  [requireSignIn, isAuth, isAdmin],
  removeProduct
);

// Get all products // Done
router.get("/", getProducts);

// Get a single product // Done
router.get("/:productId/", getProduct);

// Get related products // Done
router.get("/related/:productId/", listRelated);

// Product Search
router.post("/search", searchProduct);

// Param
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
