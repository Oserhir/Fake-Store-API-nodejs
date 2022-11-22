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

// @desc    Remove product from wishlist
// @route   DELETE /api/wishlist/:productId/;userId
// @access  Protected/User
exports.removeProductFromWishlist = asyncHandler(async (req, res, next) => {
  // $pull => remove productId from wishlist array if productId exist

  User.findOneAndUpdate(
    { _id: req.Profile._id },
    { $pull: { wishlist: req.params.productId } },
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
// @route   GET /api/wishlist/;IdUser
// @access  Protected/User
exports.getLoggedUserWishlist = (req, res, next) => {
  // const user = await User.findById(req.Profile._id).populate("wishlist");
  console.log(req.Profile._id);

  User.findById(req.Profile._id)
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
