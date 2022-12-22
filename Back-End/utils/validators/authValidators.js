const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const User = require("../../models/userSchema");
const bcrypt = require("bcrypt");

exports.signupValidator = [
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
    .withMessage("password length must be at least 4 characters long"),
  validatorMiddleware,
];

exports.loginValidator = [
  // Check if password and email in the body
  check("email")
    .notEmpty()
    .withMessage("email not allowed to be empty")
    .isEmail()
    .withMessage("email must be a valid email")
    .custom(async (email, { req }) => {
      // Check if the user exists in database
      const user = await User.findOne({ email: email });
      if (!user) {
        return Promise.reject(
          new Error(
            "The email address you entered isn't connected to an account"
          )
        );
      }

      req.user = user;
      return true;
    }),

  check("password")
    .notEmpty()
    .withMessage("password not allowed to be empty")
    .custom(async (password, { req }) => {
      const { email } = req.body;
      const user = await User.findOne({ email: email });
      // compare Hash Password
      if (user && !(await bcrypt.compare(password, user.password))) {
        return Promise.reject(
          new Error("The password that you've entered is incorrect", 401)
        );
      }
    }),
  validatorMiddleware,
];
