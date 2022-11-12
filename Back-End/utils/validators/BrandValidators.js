const { body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getSpecifiqueBrandValidator = [
  // body("brandId").isMongoId().withMessage("Invalid Category Id"),
  validatorMiddleware,
];

exports.createBrandValidator = [
  body("name")
    .notEmpty()
    .withMessage("Brand Required")
    .isLength({ min: 3 })
    .withMessage("Too short brand name")
    .isLength({ max: 32 })
    .withMessage("Too long brand name"),
  validatorMiddleware,
];

exports.updateBrandValidator = [
  // body("brandId").isMongoId().withMessage("Invalid Category Id"),
  body("name").optional(),
  validatorMiddleware,
];

exports.deleteBrandValidator = [
  // body("categoryId").isMongoId().withMessage("Invalid Category Id"),
  validatorMiddleware,
];
