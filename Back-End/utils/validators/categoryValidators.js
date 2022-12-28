const { body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const slugify = require("slugify");
const Category = require("../../models/categorySchema");
const ApiError = require("../APIError");

exports.getSpecifiqueCategoriesValidator = [
  // body("id").isMongoId().withMessage("Invalid Category Id"),
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
    .custom(async (val, { req }) => {
      // Check if the Category name already exists
      const category = await Category.findOne({ name: val });

      if (category) {
        throw new Error("Category with this Name already exists");
      }
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.updateCategoryValidator = [
  // body("id").isMongoId().withMessage("Invalid Category Id"),
  body("name")
    .optional()
    .custom(async (val, { req }) => {
      // Check if the Category name already exists
      const category = await Category.findOne({ name: val });
      if (category) {
        throw new Error("Category with this Name already exists");
      }
    }),
  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  // body("categoryId").isMongoId().withMessage("Invalid Category Id"),
  validatorMiddleware,
];
