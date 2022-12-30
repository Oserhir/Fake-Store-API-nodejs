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

router.post(
  "/",
  [requireLogIn, allowedTo("user")],
  addProductToWishlistValidator,
  addProductToWishlist
);

router.delete(
  "/:id",
  [requireLogIn, allowedTo("user")],
  removeProductFromWishlist
);

router.get(
  "/",
  [requireLogIn, allowedTo("user")],
  getLoggedUserWishlist
);

// Param
router.param("userId", userById);

module.exports = router;
