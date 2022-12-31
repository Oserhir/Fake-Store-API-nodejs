const express = require("express");
const app = express();
const router = express.Router();

const {
  createCouponValidator,
  updateCouponValidator,
} = require("../utils/validators/couponValidator");

const {
  createCoupon,
  updateCoupon,
  getCoupon,
  getCoupons,
  deleteCoupon,
  couponById,
} = require("../controllers/couponController");

const { isAuth, requireLogIn, allowedTo } = require("../middlewares/auth");

// @desc Get list of coupons
router.get("/", getCoupons);

// @desc Get specific coupon
router.get("/:id", getCoupon);

// @desc Create coupon
router.post(
  "/",
  [requireLogIn, allowedTo("admin")],
  createCouponValidator,
  createCoupon
);

// @desc Update specific Coupon
router.put("/:id", updateCouponValidator, updateCoupon);

// @desc Delete specific Coupon
router.delete("/:id", deleteCoupon);

module.exports = router;
