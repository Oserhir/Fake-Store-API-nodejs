const { body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const slugify = require("slugify");

exports.getSpecifiqueCategoriesValidator = [
  // body("categoryId").isMongoId().withMessage("Invalid Category Id"),
  validatorMiddleware,
];

exports.createCategoryValidator = [
  body("name")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
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
