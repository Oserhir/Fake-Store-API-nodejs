const { body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getSpecifiqueCategoriesValidator = [
  // body("categoryId").isMongoId().withMessage("Invalid Category Id"),
  validatorMiddleware,
];

exports.createCategoryValidator = [
  body("name").optional(),
  validatorMiddleware,
];

exports.updateCategoryValidator = [
  // body("categoryId").isMongoId().withMessage("Invalid Category Id"),
  body("name").optional(),
  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  // body("categoryId").isMongoId().withMessage("Invalid Category Id"),
  validatorMiddleware,
];
