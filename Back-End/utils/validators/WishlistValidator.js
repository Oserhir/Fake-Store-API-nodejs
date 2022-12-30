const { body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Product = require("../../models/productSchema");

exports.addProductToWishlistValidator = [
  body("product").custom(async (val) => {
    const product = await Product.findById(val);
    if (!product) {
      return Promise.reject(new Error(`There is no product with id ${val}`));
    }
  }),
  validatorMiddleware,
];
