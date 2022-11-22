const asyncHandler = require("express-async-handler");

const User = require("../models/userSchema");

// @desc    Add product to wishlist
// @route   POST /api/v1/wishlist
// @access  Protected/User
exports.addProductToWishlist = (req, res, next) => {

  // $addToSet => add productId to wishlist array if productId not exist
  User.findOneAndUpdate(
    { _id: req.Profile._id },
    { $addToSet: { wishlist: req.body.productId } },
    { new: true },
    (err, doc) => {
      if (err) {
        res.status(400).json({ err: "Something wrong when updating data!" });
      }

      res.status(200).json({
        status: "success",
        message: "Product added successfully to your wishlist.",
        data: doc.wishlist,
      });
    }
  );
};
