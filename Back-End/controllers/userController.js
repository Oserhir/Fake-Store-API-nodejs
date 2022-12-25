const User = require("../models/userSchema");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

//  @desc update user  @access Private/Admin
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.Profile._id,
    {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    },
    {
      new: true,
    }
  );
  if (!user) {
    return next(new ApiError(`No user for this id ${req.user._id}`, 404));
  }
  res.status(200).json({ data: user });
});

// @desc Get a single user @access Private/Admin
exports.getUser = (req, res) => {
  res.status(200).json({ data: req.Profile });
};

// @desc  Get all users @access Private/Admin
exports.getallusers = (req, res) => {
  User.find().exec((err, users) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }

    res.status(200).json({
      results: users.length,
      data: users,
    });
  });
};

// @desc Create a user @access Private/Admin
exports.createUser = (req, res) => {
  User.create(req.body)
    .then((user) => {
      if (user) {
        res.status(201).json({ data: user });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// @desc Delete a user @access Private/Admin
exports.deleteUser = asyncHandler(async (req, res) => {
  let user = req.Profile;

  user.remove((err, user) => {
    if (err || !user) {
      return res.status(400).json({ err: "User not found!" });
    }

    res.status(204).json({});
  });
});

// @desc Change Password @access Private/Admin
exports.changePasswords = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.Profile._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      // passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  res.status(200).json({ data: user });
});

// @desc Get Logged User @access Private/Protect
exports.getLoggedUserData = (req, res, next) => {
  req.Profile = req.crUser;
  next();
};

// @desc Update Logged User @access Private/Protect
exports.updateLoggedUserData = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.crUser._id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
    }
  );
  if (!user) {
    return next(new ApiError(`No user for this id ${req.user._id}`, 404));
  }
  res.status(200).json({ data: user });
});
