const express = require("express");

//  Allow us to access parameters on other routers
const router = express.Router({ mergeParams: true });

// Nested Route
// @Desc Get all reviews on specifique products
const reviewsRoute = require("./review");
router.use("/:productID/reviews", reviewsRoute);

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
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidators");

const { userById } = require("../middlewares/user");
const { isAuth, requireLogIn, allowedTo } = require("../middlewares/auth");

// @desc Create a product
// @access Private/Admin
router.post(
  "/",
  [requireLogIn, allowedTo("admin")],
  uploadProductImages,
  resizeProductImage,
  createProductValidator,
  createProduct
);

// @desc Update a product
// @access Private/Admin
router.put(
  "/:id",
  [requireLogIn, allowedTo("admin")],
  uploadProductImages,
  resizeProductImage,
  updateProductValidator,
  updateProduct
);

// @desc Delete a product
// @access Private/Admin
router.delete(
  "/:id",
  [requireLogIn, allowedTo("admin")],
  deleteProductValidator,
  removeProduct
);

// @desc Get all products
// @access Public
router.get("/", getProducts);

// @desc  Get a single product
// @access Public
router.get("/:id/", getProduct);

// @desc  Get Related Products Base in Product_Id
// @access Public
router.get("/related/:productId/", listRelated);

// @desc Product Search
// @access Public
router.post("/search", searchProduct);

// Param
router.param("productId", productById);

module.exports = router;
