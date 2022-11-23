const express = require("express");
const app = express();
const router = express.Router();

const {
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
  getSpecifiqueBrandValidator,
} = require("../utils/validators/BrandValidators");

const {
  createCoupon,
  updateCoupon,
  getCoupon,
  getCoupons,
  deleteCoupon,
  couponById,
} = require("../controllers/couponController");

const { requireSignIn, isAuth, isAdmin } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");

// Get List of Coupon
router.get("/:userId", [requireSignIn, isAuth, isAdmin], getCoupons);

// Get specific Coupon
router.get("/:couponId/:userId", [requireSignIn, isAuth, isAdmin], getCoupon);

// Add new Coupon
router.post("/create/:userId", [requireSignIn, isAuth, isAdmin], createCoupon);

// Update specific Coupon
router.put(
  "/:couponId/:userId",
  [requireSignIn, isAuth, isAdmin],
  updateCoupon
);

// Delete specific Coupon
router.delete(
  "/:couponId/:userId",
  [requireSignIn, isAuth, isAdmin],
  deleteCoupon
);

router.param("userId", userById);
router.param("couponId", couponById);

module.exports = router;
