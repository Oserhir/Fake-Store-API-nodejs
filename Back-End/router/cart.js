const express = require("express");
const app = express();
const router = express.Router();

// const {
//   createBrandValidator,
//   updateBrandValidator,
//   deleteBrandValidator,
//   getSpecifiqueBrandValidator,
// } = require("../utils/validators/BrandValidators");

const { addProductToCart } = require("../controllers/cartController");

const { requireSignIn, isAuth } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");

// add Product To Cart
router.post(
  "/create/:userId",
  [requireSignIn, isAuth],
  addProductToCart
);

router.param("userId", userById);

module.exports = router;
