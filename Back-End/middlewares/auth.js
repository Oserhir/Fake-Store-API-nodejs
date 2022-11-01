// Checking the Current User

const { expressjwt } = require("express-jwt");
require("dotenv").config(); // access environment variables

// require("dotenv").config();

exports.requireSignIn = expressjwt({
  // if the token is valid express-jwt appends the verified users id
  // in an auth key to the request object
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  // if (req.auth.user_role == 1) {
  //   return next();
  // }

  let user = req.Profile && req.auth && req.Profile._id == req.auth.user_id;

  if (!user) {
    return res.status(403).send("Access Denied");
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.auth.user_role == 0) {
    return res.status(403).json({ error: "Admin Resource, Access Denied !" });
  }
  next();
};
