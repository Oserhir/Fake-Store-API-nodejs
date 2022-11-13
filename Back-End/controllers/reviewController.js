const reviewModel = require("../models/ReviewModel");
const slugify = require("slugify");

const APIError = require("../utils/APIError");

// @desc Add new Review
exports.createReview = (req, res) => {
  reviewModel
    .create(req.body)
    .then((review) => {
      res.status(201).json({ data: review });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// @desc Get specific Review
exports.getReview = (req, res) => {
  res.send({ review: req.review });
};

// @desc Get List of Reviews
exports.getReviews = (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit || 5;
  const skip = (page - 1) * limit;

  reviewModel
    .find()
    .skip(skip)
    .limit(limit)
    .exec((err, reviews) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }

      res.json({
        page: page,
        reviews: reviews,
      });
    });
};

// @desc Update specific Review
exports.updateReview = (req, res) => {
  let review = req.review;
  review.title = req.body.title;
  review.ratings = req.body.ratings;
  review.save((err, review) => {
    if (err) {
      return res.status(400).json({ err: "bad request !" });
    }
  });

  res.json({ review, message: "Review updated" });
};

// @desc Delete specific Brand
exports.deleteReview = (req, res) => {
  let review = req.review;

  review.remove((err, review) => {
    if (err || !review) {
      return res.status(400).json({ err: "review not found!" });
    }

    res.status(204).json({});
  });
};

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
