const express = require("express");
const router = express.Router();

const { addProductToWishlist } = require("../controllers/wishlistController");
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

// Param
router.param("userId", userById);

module.exports = router;
