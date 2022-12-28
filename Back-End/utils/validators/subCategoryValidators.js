const { body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const SubcategoryModel = require("../../models/subcategorySchema");
const categorySchema = require("../../models/categorySchema");
const slugify = require("slugify");

exports.getSpecifiqueCategoriesValidator = [
  // body("categoryId").isMongoId().withMessage("Invalid Category Id"),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  body("name")
    .notEmpty()
    .withMessage("name is not allowed to be empty")
    .isLength({ min: 3 })
    .withMessage("name length must be at least 3 characters long")
    .isLength({ max: 32 })
    .withMessage("name length must be less than or equal to 32 characters long")
    .custom(async (value, { req }) => {
      const subcategory = await SubcategoryModel.findOne({ name: value });
      if (subcategory) {
        throw new Error("Subcategory with this Name already exists");
      }

      req.body.slug = slugify(value);
      return true;
    }),
  body("category")
    .notEmpty()
    .withMessage("subCategory must be belong to category")
    .isMongoId()
    .withMessage("Invalid Category id format")
    .custom(async (value) => {
      const category = await categorySchema.findById(value);
      if (!category) {
        throw new Error(`No category for this id ${value}`);
      }
    }),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  body("name")
    .notEmpty()
    .withMessage("name is not allowed to be empty")
    .isLength({ min: 3 })
    .withMessage("name length must be at least 3 characters long")
    .isLength({ max: 32 })
    .withMessage("name length must be less than or equal to 32 characters long")
    .custom(async (value, { req }) => {
      const subcategory = await SubcategoryModel.findOne({ name: value });
      if (subcategory) {
        throw new Error("Subcategory with this Name already exists");
      }

      req.body.slug = slugify(value);
      return true;
    }),
  body("category")
    .optional()
    .isMongoId()
    .withMessage("Invalid Category id format")
    .custom(async (value) => {
      const category = await categorySchema.findById(value);
      if (!category) {
        throw new Error(`No category for this id ${value}`);
      }
    }),
  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  // body("id").isMongoId().withMessage("Invalid SubCategory id format"),
  validatorMiddleware,
];
