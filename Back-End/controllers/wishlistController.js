const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/APIError");

const User = require("../models/userSchema");

// @desc    Add product to wishlist
exports.addProductToWishlist = (req, res, next) => {
  // $addToSet => add productId to wishlist array if productId not exist
  User.findOneAndUpdate(
    { _id: req.crUser._id },
    { $addToSet: { wishlist: req.body.product } },
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

// @desc    Remove product from wishlist
exports.removeProductFromWishlist = asyncHandler(async (req, res, next) => {
  // $pull => remove productId from wishlist array if productId exist

  User.findOneAndUpdate(
    { _id: req.crUser._id },
    { $pull: { wishlist: req.params.id } },
    { new: true },
    (err, doc) => {
      if (err) {
        res.status(400).json({ err: "Something wrong when updating data!" });
      }

      res.status(200).json({
        status: "success",
        message: "Product removed successfully from your wishlist.",
        data: doc.wishlist,
      });
    }
  );
});

// @desc    Get logged user wishlist
exports.getLoggedUserWishlist = (req, res, next) => {
  // const user = await User.findById(req.Profile._id).populate("wishlist");0
  User.findById(req.crUser._id)
    .populate("wishlist")
    .then((user) => {
      if (user) {
        res.status(200).json({
          status: "success",
          results: user.wishlist.length,
          data: user.wishlist,
        });
      }
    });
};
