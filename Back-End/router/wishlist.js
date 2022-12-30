const express = require("express");
const router = express.Router();

const {
  addProductToWishlist,
  removeProductFromWishlist,
  getLoggedUserWishlist,
} = require("../controllers/wishlistController");
const {
  addProductToWishlistValidator,
} = require("../utils/validators/WishlistValidator");

const { isAuth, requireLogIn, allowedTo } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");

// @desc    Add product to wishlist
// @access    Private/User
router.post(
  "/",
  [requireLogIn, allowedTo("user")],
  addProductToWishlistValidator,
  addProductToWishlist
);

// @desc    Remove Product From Wishlist
// @access    Private/User
router.delete(
  "/:id",
  [requireLogIn, allowedTo("user")],
  removeProductFromWishlist
);

// @desc   Get Logged User Wishlist
// @access    Private/User
router.get("/", [requireLogIn, allowedTo("user")], getLoggedUserWishlist);

// Param
router.param("userId", userById);

module.exports = router;
