const Joi = require("joi");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/APIError");

require("dotenv").config(); // access environment variables

// @desc  create a new user in db
// @access Public
module.exports.signup_post = (req, res) => {
  // Create User
  User.create(req.body)
    .then((user) => {
      if (user) {
        // Generate Token
        const token = createToken(user._id);
        // Send token to client side ( Cookies )
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
        });
        // Send response to client side
        res.status(201).send({ token: token, data: user });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// @desc  authenticate a current user
// @access Public
module.exports.login_post = (req, res) => {
  // Create Token and send it to the Browser
  const token = createToken(req.user._id);
  res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

  // Delete password from response
  delete req.user._doc.password;

  // send response to client side
  res.status(200).json({
    token: token,
    user: req.user,
  });
};

// @desc  log a user out
// @access Private
module.exports.signout_get = (req, res) => {
  res.clearCookie("jwt");
  res.send("User signOUT");
};

// @desc create json web token
// Signing a token with 3 Days of expiration:
const maxAge = 3 * 24 * 60 * 60;
const createToken = (user_id, user_role) => {
  return jwt.sign({ user_id, user_role }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};
