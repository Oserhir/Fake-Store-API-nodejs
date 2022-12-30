const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Review = require("../../models/ReviewModel");
const Product = require("../../models/productSchema");

exports.getSpecifiqueBrandValidator = [validatorMiddleware];

exports.createReviewValidator = [
  check("title").optional(),
  check("ratings")
    .notEmpty()
    .withMessage("ratings value required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Ratings value must be between 1 to 5"),
  // check("user") .isMongoId().withMessage("Invalid User id format"),
  check("product").custom(async (val, { req }) => {
    // Check if the product is existing or no
    const product = await Product.findById(req.body.product);
    if (!product) {
      return Promise.reject(
        new Error(`No product for this id ${req.body.product}`)
      );
    }
    // Check if logged user create review before
    const review = await Review.findOne({
      user: req.crUser._id,
      product: req.body.product,
    });

    if (review) {
      return Promise.reject(new Error("You already created a review before"));
    }
  }),
  validatorMiddleware,
];

exports.getReviewValidator = [
  check("id").isMongoId().withMessage("Invalid Review id format"),
  validatorMiddleware,
];

exports.updateReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Review id format")
    .custom((val, { req }) =>
      // Check review ownership before update
      Review.findById(val).then((review) => {
        if (!review) {
          return Promise.reject(new Error(`There is no review with id ${val}`));
        }
        if (review.user._id.toString() !== req.crUser._id.toString()) {
          return Promise.reject(
            new Error(`Your are not allowed to perform this action`)
          );
        }
      })
    ),
  validatorMiddleware,
];

exports.deleteReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Review id format")
    .custom((val, { req }) => {
      // Check review ownership before Delete
      if (req.crUser.role === "user") {
        return Review.findById(val).then((review) => {
          if (!review) {
            return Promise.reject(
              new Error(`There is no review with id ${val}`)
            );
          }
          if (review.user._id.toString() !== req.crUser._id.toString()) {
            return Promise.reject(
              new Error(`Your are not allowed to perform this action`)
            );
          }
        });
      }
      return true;
    }),
  validatorMiddleware,
];
