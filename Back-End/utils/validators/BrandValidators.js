const { body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const slugify = require("slugify");
const Brand = require("../../models/brandsSchema");

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
    .withMessage("Too long brand name")
    .custom(async (value, { req }) => {
      const brand = await Brand.findOne({ name: value });
      if (brand) {
        throw new Error("Brand with this Name already exists");
      }
    }),
  validatorMiddleware,
];

exports.updateBrandValidator = [
  // body("id").isMongoId().withMessage("Invalid Brand Id"),
  body("name")
    .optional()
    .custom(async (value, { req }) => {
      const brand = await Brand.findOne({ name: value });
      if (brand) {
        throw new Error("Brand with this Name already exists");
      }
    }),
  validatorMiddleware,
];

exports.deleteBrandValidator = [
  // body("id").isMongoId().withMessage("Invalid Category Id"),
  validatorMiddleware,
];
