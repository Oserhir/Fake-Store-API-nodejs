const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const User = require("../../models/userSchema");
const bcrypt = require("bcrypt");

exports.createUserValidator = [
  check("email")
    .notEmpty()
    .withMessage("email is not allowed to be empty")
    .isLength({ min: 12 })
    .withMessage("email length must be at least 12 characters long")
    .isEmail()
    .withMessage("email must be a valid email")
    .custom(async (value, req) => {
      // check if user already exists in database
      const user = await User.findOne({ email: value });
      if (user) {
        return Promise.reject(
          new Error("Sorry, that email address is already used!")
        );
      }
    }),
  check("name")
    .notEmpty()
    .withMessage("name is not allowed to be empty")
    .isLength({ min: 3 })
    .withMessage("name length must be at least 3 characters long"),

  check("password")
    .notEmpty()
    .withMessage("password is not allowed to be empty")
    .isLength({ min: 4 })
    .withMessage("password length must be at least 4 characters long")
    .custom((password, { req }) => {
      if (password != req.body.passwordConfirm) {
        throw new Error("Password Confirmation incorrect");
      }

      return true;
    }),

  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password confirmation required"),

  validatorMiddleware,
];

exports.updateUserValidator = [
  check("userId").isMongoId().withMessage("Invalid User id format"),
  check("email")
    .optional()
    // .notEmpty()
    // .withMessage("email is not allowed to be empty")
    .isLength({ min: 12 })
    .withMessage("email length must be at least 12 characters long")
    .isEmail()
    .withMessage("email must be a valid email"),
  // .custom(async (value, req) => {
  //   // check if user already exists in database
  //   const user = await User.findOne({ email: value });
  //   if (user) {
  //     return Promise.reject(
  //       new Error("Sorry, that email address is already used!")
  //     );
  //   }
  // }),
  check("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("name length must be at least 3 characters long"),

  validatorMiddleware,
];
