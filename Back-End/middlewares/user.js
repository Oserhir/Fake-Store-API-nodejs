const User = require("../models/userSchema");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(404).json("User not found !!");
    }

    req.Profile = user;
    next();
  });
};
