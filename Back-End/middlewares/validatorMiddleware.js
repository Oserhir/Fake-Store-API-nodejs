// const Joi = require("joi");
// const User = require("../models/userSchema");

const { validationResult } = require("express-validator");
// @desc Find the validation errors in this request and wraps them in an object with handy functions
const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validatorMiddleware;

// exports.userSignUpValidator = (req, res, next) => {
//   const schema = Joi.object({
//     name: Joi.string().min(2).max(20).required(),
//     email: Joi.string().min(6).max(50).required().email(),
//     password: Joi.string().min(5).max(50).required(),
//   });

//   const { error, value } = schema.validate(req.body);

//   // Joi Validation
//   if (error) {
//     res.status(400).send(error.details[0].message);
//   } else {
//     // check if user already exists in database
//     User.findOne({ email: value.email }).then((result) => {
//       if (result) {
//         res.status(400).json("User already exists");
//       }
//     });
//   }

//   next();
// };
