const Joi = require("joi");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/APIError");

require("dotenv").config(); // access environment variables

module.exports.signup_get = (req, res) => {
  res.send("signUp.....");
};

// @desc   create a new user in db
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

module.exports.login_get = (req, res) => {
  res.send("Login..");
};

// @desc  authenticate a current user
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
module.exports.signout_get = (req, res) => {
  res.clearCookie("jwt");
  res.send("User signOUT");
};

// @desc make sure the user is logged in
exports.requireLogIn = async (req, res, next) => {
  // Check if token exist, if exist get token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new ApiError(
        "You are not login, Please login to get access this route",
        401
      )
    );
  }

  // Verify token (no change happens, expired token)
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //Check if user exists
  const currentUser = await User.findById(decoded.user_id);
  if (!currentUser) {
    return next(
      new ApiError(
        "The user that belong to this token does no longer exist",
        401
      )
    );
  }

  req.user = currentUser;
  next();
};

// create json web token
// Signing a token with 3 Days of expiration:
const maxAge = 3 * 24 * 60 * 60;
const createToken = (user_id, user_role) => {
  return jwt.sign({ user_id, user_role }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

// const createToken = (userid, user_role) => {
//   return jwt.sign({ userid }, process.env.JWT_SECRET, {
//     expiresIn: maxAge,
//   });
// };
