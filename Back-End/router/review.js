const express = require("express");
const app = express();
const router = express.Router({ mergeParams: true });

// Nested route
// GET /api/products/:productId/reviews
createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.productId) filterObject = { product: req.params.productId };
  req.filterObj = filterObject;
  next();
};

// Nested route
// POST /api/products/:productId/reviews
createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.productId) filterObject = { product: req.params.productId };
  req.filterObj = filterObject;
  next();
};

const {
  createReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
} = require("../utils/validators/ReviewValidators");

const {
  createReview,
  getReview,
  getReviews,
  updateReview,
  deleteReview,
  reviewById,
} = require("../controllers/reviewController");

const { requireSignIn, isAuth, isAdmin } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");

// Get List of Review
router.get("/", createFilterObj, getReviews);

// Get specific Review
router.get("/:reviewId", getReview);

// Add new Review
router.post(
  "/create/:userId",
  //[requireSignIn, isAuth],
  createReviewValidator,
  createReview
);

// Update specific Review
router.put(
  "/:reviewId/:userId",
  // [requireSignIn, isAuth],
  updateReviewValidator,
  updateReview
);

// Delete specific Review
router.delete(
  "/:reviewId/:userId",
  // [requireSignIn, isAuth],
  deleteReviewValidator,
  deleteReview
);

router.param("userId", userById);
router.param("reviewId", reviewById);

module.exports = router;
