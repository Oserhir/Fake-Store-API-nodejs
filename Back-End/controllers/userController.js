const User = require("../models/userSchema");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/APIError");

//  @desc update user
//  @access Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
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
    return next(new ApiError(`No user for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: user });
});

// @desc Get a single user
// @access Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(new ApiError(`No user for this id ${id}`, 404));
  }
  res.status(200).json({ data: user });
});

// @desc  Get all users
// @access Private/Admin
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

// @desc Create a user
// @access Private/Admin
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

// @desc Delete a user
// @access Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const document = await User.findByIdAndDelete(id);

  if (!document) {
    return next(new ApiError(`No document for this id ${id}`, 404));
  }

  document.remove();
  res.status(204).send();
});

// @desc Change Password
// @access Private/Admin
exports.changePasswords = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  res.status(200).json({ data: user });
});

// @desc Get Logged User
// @access Private/Protect
exports.getLoggedUserData = (req, res, next) => {
  req.params.id = req.crUser._id;
  next();
};

// @desc Update Logged User
// @access Private/Protect
exports.updateLoggedUserData = asyncHandler(async (req, res) => {
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

// @desc Delete Logged User
// @access Private/Protect
exports.deleteLoggedUserData = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.crUser._id,
    {
      active: false,
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

// @desc Activate Logged User
// @access Private/Protect
exports.activeLoggedUserData = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.crUser._id,
    {
      active: true,
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

// @desc Deactivate Logged User
// @access Private/Protect
exports.isDeactivate = asyncHandler(async (req, res, next) => {
  // Check if account is not activated

  if (!req.crUser.active) {
    return next(
      new ApiError(
        "Your account has been deactivated : Please Reactivate Your Account",
        401
      )
    );
  }

  next();
});

exports.userById = (req, res, next) => {
  User.findById(req.params.id).exec((err, user) => {
    if (err || !user) {
      return next(new ApiError(`No user for this id ${req.params.id}`, 404));
      // return res.status(404).json("User not found !!");
    }

    req.Profile = user;
    next();
  });
};
