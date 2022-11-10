const { body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getSpecifiqueCategoriesValidator = [
  // body("categoryId").isMongoId().withMessage("Invalid Category Id"),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  body("name")
    .notEmpty()
    .withMessage("SubCategory Required")
    .isLength({ min: 3 })
    .withMessage("Too short subcategory name")
    .isLength({ max: 32 })
    .withMessage("Too long subcategory name"),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  // body("categoryId").isMongoId().withMessage("Invalid Category Id"),
  body("name")
    .notEmpty()
    .withMessage("Category Required")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name"),
  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  // body("categoryId").isMongoId().withMessage("Invalid Category Id"),
  validatorMiddleware,
];
