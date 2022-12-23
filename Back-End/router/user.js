const express = require("express");
const router = express.Router();
const {
  createUserValidator,
  updateUserValidator,
  changePasswordValidator,
} = require("../utils/validators/userValidators");

const {
  updateUser,
  getUser,
  getallusers,
  createUser,
  deleteUser,
  changePasswords,
  checkTheEmail,
} = require("../controllers/userController");
const { userById } = require("../middlewares/user");
const { requireSignIn, isAuth, isAdmin } = require("../middlewares/auth");
const { requireLogIn } = require("../controllers/authController");

// Get a single user
router.get("/:userId", getUser);

// Get all users
router.get("/", getallusers);

// Create a user
router.post("/", createUserValidator, createUser);

// Update a user
router.put(
  "/:userId",
  // [requireSignIn, isAuth],
  updateUserValidator,
  updateUser
);

// Delete a user
router.delete(
  "/:userId",
  // [requireSignIn, isAuth],
  deleteUser
);

// Change Password
router.put(
  "/changeMyPassword/:userId",
  changePasswordValidator,
  changePasswords
);

// router.get("/profile/:userId", requireSignIn, isAuth, getOneUser_get);
router.param("userId", userById); // Any route contain "userId" my app will execute userByID()

module.exports = router;
