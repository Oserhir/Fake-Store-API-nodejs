const express = require("express");
const app = express();
const router = express.Router();
const { updateCartValidator } = require("../utils/validators/cartValidator");

const {
  addProductToCart,
  getLoggedUserCart,
  removeSpecificCartItem,
  clearCart,
  updateCartItemQuantity,
  applyCoupon,
} = require("../controllers/cartController");

const { isAuth, requireLogIn, allowedTo } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");

//  @desc add Product To Cart
//  @desc Private/User
router.post("/", [requireLogIn, allowedTo("user")], addProductToCart);

//  @desc get Logged User Cart
//  @desc Private/User
router.get("/", [requireLogIn, allowedTo("user")], getLoggedUserCart);

// @desc remove Specific Cart Item
//  @desc Private/User
router.delete(
  "/:itemId",
  [requireLogIn, allowedTo("user")],
  removeSpecificCartItem
);

// @desc  Clear logged user cart
//  @desc Private/User
router.delete("/", [requireLogIn, allowedTo("user")], clearCart);

// @Desc Apply Coupon On Shopping Cart
router.put("/applyCoupon", [requireLogIn, allowedTo("user")], applyCoupon);

// @Desc Update Cart Item Quantity
router.put(
  "/:itemId/",
  [requireLogIn, allowedTo("user")],
  updateCartValidator,
  updateCartItemQuantity
);

router.param("userId", userById);

module.exports = router;
