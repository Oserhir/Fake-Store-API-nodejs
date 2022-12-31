const slugify = require("slugify");
const couponModel = require("../models/couponSchema");
const APIError = require("../utils/APIError");
const factory = require("../controllers/handlersFactory");

// @desc Get list of coupons
exports.getCoupons = factory.getAll(couponModel, "coupon");

// @desc Create coupon
exports.createCoupon = factory.createOne(couponModel);

// @desc Update specific coupon
exports.updateCoupon = factory.updateOne(couponModel, "Coupon");

// @desc Get specific Category
exports.getCoupon = factory.getOne(couponModel);

// @desc Delete specific coupon
exports.deleteCoupon = factory.deleteOne(couponModel);
