const { body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const slugify = require("slugify");
const Cart = require('../../controllers/cartController')

exports.updateCartValidator = [
  body("quantity")
    .notEmpty()
    .withMessage("quantity Required")
    .custom(async (quantity, { req }) => {
        // 
      if (quantity < 0) {
        throw new Error("Quantity must be greater than or equal to 1");
      }

      // 

    }),
  validatorMiddleware,
];

exports.deleteBrandValidator = [
  // body("id").isMongoId().withMessage("Invalid Category Id"),
  validatorMiddleware,
];
