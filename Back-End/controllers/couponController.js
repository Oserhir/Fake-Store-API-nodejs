const slugify = require("slugify");
const couponModel = require("../models/couponSchema");
const APIError = require("../utils/APIError");

// @desc Get List of Categories
exports.getCoupons = (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit || 5;
  const skip = (page - 1) * limit;

  couponModel
    .find()
    .skip(skip)
    .limit(limit)
    .exec((err, coupons) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }

      res.json({
        page: page,
        coupons: coupons,
      });
    });
};

//  @desc create category
exports.createCoupon = (req, res) => {
  couponModel.findOne({ name: req.body.name }).then((coupon) => {
    if (coupon) {
      res.status(400).send("Coupon already exists");
    } else {
      couponModel
        .create(req.body)
        .then((coupon) => {
          res.status(201).json({ data: coupon });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    }
  });
};

//  @desc Update specific Category
exports.updateCoupon = (req, res) => {
  const { couponId } = req.params;

  couponModel.findOneAndUpdate(
    { _id: couponId },
    req.body,
    { new: true },
    (err, doc) => {
      if (err) {
        res.status(400).json({ err: "Something wrong when updating data!" });
      }

      res.json({ data: doc, message: "Coupon updated" });
    }
  );
};

//  @desc Get specific Category
exports.getCoupon = (req, res) => {
  res.send({ coupon: req.Coupon });
};

// @desc Delete specific Category
exports.deleteCoupon = (req, res) => {
  let coupon = req.Coupon;

  coupon.remove((err, coupon) => {
    if (err) {
      return res.status(400).json({ err: "coupon not found!" });
    }

    res.status(204).json({});
  });
};

//  @desc Get Category information Using Category ID
exports.couponById = (req, res, next, id) => {
  couponModel.findById(id).exec((err, coupon) => {
    if (err || !coupon) {
      // return res.status(404).json({
      //   errors: "Category not found !",
      // });
      return next(new APIError(`coupon not found !`, 404));
    }

    req.Coupon = coupon;
    next();
  });
};
