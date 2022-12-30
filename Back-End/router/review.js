const express = require("express");
const app = express();
const router = express.Router({ mergeParams: true });

// Nested route
// GET /api/products/:productId/reviews
createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.productID) filterObject = { product: req.params.productID };
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
  setProductIdAndUserIdToBody,
} = require("../controllers/reviewController");

const { isAuth, requireLogIn, allowedTo } = require("../middlewares/auth");

// @Desc Get List of Reviews
// @access Public
router.get("/", createFilterObj, getReviews);

// @Desc Get specific Review
// @access Public
router.get("/:id", getReview);

// @Desc Create Review
// @access Private/Protect
router.post(
  "/",
  [requireLogIn, allowedTo("user")],
  setProductIdAndUserIdToBody,
  createReviewValidator,
  createReview
);

// @Desc Update specific Review
// @access Private/Protect
router.put(
  "/:id",
  [requireLogIn, allowedTo("user")],
  updateReviewValidator,
  updateReview
);

// @Desc Delete specific Review
// @access Private/Protect/Admin
router.delete(
  "/:id",
  [requireLogIn, allowedTo("user", "admin")],
  deleteReviewValidator,
  deleteReview
);

module.exports = router;
