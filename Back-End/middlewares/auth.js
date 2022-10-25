// Checking the Current User

const { expressjwt } = require("express-jwt");
require("dotenv").config(); // access environment variables

// require("dotenv").config();

exports.requireSignIn = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});
