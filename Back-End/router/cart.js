const express = require("express");
const app = express();
const router = express.Router();

// const {
//   createBrandValidator,
//   updateBrandValidator,
//   deleteBrandValidator,
//   getSpecifiqueBrandValidator,
// } = require("../utils/validators/BrandValidators");

const {
  addProductToCart,
  getLoggedUserCart,
  removeSpecificCartItem,
} = require("../controllers/cartController");

const { requireSignIn, isAuth } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");

// add Product To Cart
router.post("/create/:userId", [requireSignIn, isAuth], addProductToCart);

// get Logged User Cart
router.get("/:userId", [requireSignIn, isAuth], getLoggedUserCart);

// remove Specific Cart Item
router.delete("/:itemId/:userId", [requireSignIn, isAuth], removeSpecificCartItem);

router.param("userId", userById);

module.exports = router;
