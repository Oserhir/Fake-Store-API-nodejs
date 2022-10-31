// Checking the Current User

const { expressjwt } = require("express-jwt");
require("dotenv").config(); // access environment variables

// require("dotenv").config();

exports.requireSignIn = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

// req.Profile if the User Exist
// req.auth -- fiha _Id dyal user  ( userProperty: "auth" // const createToken = (id) => { return jwt.sign({ id })

exports.isAuth = (req, res, next) => {
  console.log(req.auth._id);
  console.log(req.Profile._id);
  let user = req.Profile && req.auth && req.Profile._id == req.auth._id;

  if (!user) {
    return res.status(403).send("Access Denied");
  }
  next();
};
