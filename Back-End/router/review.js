const express = require("express");
const app = express();
const router = express.Router();

// const {
//   createBrandValidator,
//   updateBrandValidator,
//   deleteBrandValidator,
//   getSpecifiqueBrandValidator,
// } = require("../utils/validators/BrandValidators");

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
router.get("/", getReviews);

// Get specific Review
router.get("/:reviewId", getReview);

// Add new Review
router.post("/create/:userId", [requireSignIn, isAuth], createReview);

// Update specific Review
router.put(
  "/:reviewId/:userId",
  [requireSignIn, isAuth, isAdmin],
  updateReview
);

// Delete specific Review
router.delete("/:reviewId/:userId", [requireSignIn, isAuth], deleteReview);

router.param("userId", userById);
router.param("reviewId", reviewById);

module.exports = router;
