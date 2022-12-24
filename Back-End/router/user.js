const express = require("express");
const router = express.Router();
const {
  createUserValidator,
  updateUserValidator,
  changePasswordValidator,
  deleteUserValidator,
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

// @desc Get a single user @access Private/Admin
router.get("/:userId", getUser);

// @desc Get all users @access Private/Admin
router.get("/", getallusers);

// @desc Create a user @access Private/Admin
router.post("/", createUserValidator, createUser);

// @desc Update a user @access Private/Admin
router.put("/:userId", updateUserValidator, updateUser);

// @desc Delete a user @access Private/Admin
router.delete("/:userId", deleteUserValidator, deleteUser);

// @desc Change Password @access Public/User
router.put(
  "/changeMyPassword/:userId",
  changePasswordValidator,
  changePasswords
);

router.param("userId", userById); // Any route contain "userId" my app will execute userByID()

module.exports = router;
