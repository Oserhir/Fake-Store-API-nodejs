const { body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Product = require("../../models/productSchema");

exports.addProductToWishlistValidator = [
  body("productId")
    .isMongoId()
    .withMessage("Invalid Review id format")
    .custom((val, { req }) =>
      // Check if logged user create review before
      Product.findOne({ _id: req.body.productId }).then((product) => {
        if (!product) {
          return Promise.reject(new Error("Product Not Found"));
        }
      })
    ),

  validatorMiddleware,
];
