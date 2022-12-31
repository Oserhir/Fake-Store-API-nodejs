const slugify = require("slugify");
const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Category = require("../../models/categorySchema");
const Coupon = require("../../models/couponSchema");

exports.createCouponValidator = [
  check("name")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars")
    .notEmpty()
    .withMessage("name required")
    .custom(async (val, { req }) => {
      const coupon = await Coupon.findOne({ name: val });

      if (coupon) {
        throw new Error("coupon with this Name already exists");
      }
    }),

  validatorMiddleware,
];

exports.updateCouponValidator = [
  check("name")
    .optional()
    .custom(async (val, { req }) => {
      const coupon = await Coupon.findOne({ name: val });
      if (coupon) {
        throw new Error("coupon with this Name already exists");
      }
    }),

  validatorMiddleware,
];
