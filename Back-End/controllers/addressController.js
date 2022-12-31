const subCategoryModel = require("../models/subcategorySchema");
const slugify = require("slugify");
const User = require("../models/userSchema");

// @desc  Add address to user addresses list
exports.addAddress = (req, res, next) => {
  // $addToSet => add productId to wishlist array if productId not exist
  User.findOneAndUpdate(
    { _id: req.crUser._id },
    { $addToSet: { addresses: req.body } },
    { new: true },
    (err, doc) => {
      if (err) {
        res.status(400).json({ err: "Something wrong when updating data!" });
      }

      res.status(200).json({
        status: "success",
        message: "Address added successfully.",
        data: doc.addresses,
      });
    }
  );
};

exports.removeAddress = (req, res, next) => {
  // $pull => remove productId from wishlist array if productId exist

  User.findOneAndUpdate(
    { _id: req.crUser._id },
    { $pull: { addresses: { _id: req.params.id } } },
    { new: true },
    (err, doc) => {
      if (err) {
        res.status(400).json({ err: "Something wrong when updating data!" });
      }

      res.status(200).json({
        status: "success",
        message: "Address removed successfully.",
        data: doc.addresses,
      });
    }
  );
};

exports.getLoggedUserAddresses = (req, res, next) => {
  // const user = await User.findById(req.Profile._id).populate("wishlist");

  User.findById(req.crUser._id)
    .populate("addresses")
    .then((user) => {
      if (user) {
        res.status(200).json({
          status: "success",
          results: user.addresses.length,
          data: user.addresses,
        });
      }
    });
};
