const express = require("express");
const router = express.Router();

const {
  addProductToWishlist,
  removeProductFromWishlist,
} = require("../controllers/wishlistController");
const {
  addProductToWishlistValidator,
} = require("../utils/validators/WishlistValidator");

const { requireSignIn, isAuth } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");

router.post(
  "/:userId",
  // [requireSignIn, isAuth],
  addProductToWishlistValidator,
  addProductToWishlist
);

router.delete(
  "/:productId/:userId",
  // [requireSignIn, isAuth],
  removeProductFromWishlist
);

// Param
router.param("userId", userById);

module.exports = router;
