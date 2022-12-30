const reviewModel = require("../models/ReviewModel");
const slugify = require("slugify");
const factory = require("../controllers/handlersFactory");
const APIError = require("../utils/APIError");
const asyncHandler = require("express-async-handler");

// @desc Add new Review
exports.createReview = factory.createOne(reviewModel);

// @desc Get specific Review
exports.getReview = factory.getOne(reviewModel);

// @desc Get List of Reviews
exports.getReviews = asyncHandler(async (req, res) => {
  let filter = {};
  if (req.filterObj) {
    filter = req.filterObj;
  }

  const review = await reviewModel.find(filter);
  if (!review) {
    return next(
      new APIError(`No review for this id ${req.params.productID}`, 404)
    );
  }

  res.status(200).json({ result: review.length, data: review });
});

// @desc Update specific Review
exports.updateReview = factory.updateOne(reviewModel, "review");

// @desc Delete specific Review
exports.deleteReview = factory.deleteOne(reviewModel, "review");

// @desc Get Brand information Using Category ID
exports.reviewById = (req, res, next, id) => {
  reviewModel.findById(id).exec((err, review) => {
    if (err || !review) {
      return next(new APIError(`Review not found !`, 404));
    }

    req.review = review;
    next();
  });
};

exports.setProductIdAndUserIdToBody = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.crUser;
  next();
};
