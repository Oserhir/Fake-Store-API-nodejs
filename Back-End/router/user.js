const express = require("express");
const router = express.Router();

const {
  createUserValidator,
  updateUserValidator,
  changePasswordValidator,
  deleteUserValidator,
  updateLoggedUserValidator,
  getUserValidator,
} = require("../utils/validators/userValidators");

const {
  updateUser,
  getUser,
  getallusers,
  createUser,
  deleteUser,
  changePasswords,
  getLoggedUserData,
  updateLoggedUserData,
  deleteLoggedUserData,
  activeLoggedUserData,
  isDeactivate,
} = require("../controllers/userController");
// const { userById } = require("../middlewares/user");

const { isAuth, requireLogIn, allowedTo } = require("../middlewares/auth");
const { route } = require("./auth");
const { userById } = require("../controllers/userController");

// @desc Get Logged User
router.get(
  "/getMe",
  requireLogIn,
  allowedTo("user", "admin"),
  isDeactivate,
  getLoggedUserData,
  getUser
);
// @desc Update Logged User
router.put(
  "/updateMe",
  requireLogIn,
  isDeactivate,
  updateLoggedUserValidator,
  updateLoggedUserData
);
// @desc  Deactivate Logged User
router.delete("/deleteMe", requireLogIn, deleteLoggedUserData);

// @desc  Acitvate Logged User
router.put("/ActiveMe", requireLogIn, activeLoggedUserData);

// Admin
router.use(requireLogIn);

// @desc Get a single user @access Private/Admin
router.get("/:id", allowedTo("admin"), getUserValidator, getUser);

// @desc Get all users @access Private/Admin
router.get("/", allowedTo("admin"), getallusers);

// @desc Create a user @access Private/Admin
router.post("/", allowedTo("admin"), createUserValidator, createUser);

// @desc Update a user @access Private/Admin
router.put("/:id", allowedTo("admin"), updateUserValidator, updateUser);

// @desc Delete a user @access Private/Admin
router.delete("/:id", allowedTo("admin"), deleteUserValidator, deleteUser);

// @desc Change Password @access Private/Admin
router.put(
  "/changeMyPassword/:id",
  allowedTo("admin"),
  userById,
  changePasswordValidator,
  changePasswords
);

// router.param("userId", userById); // @desc Any route contain "userId" my app will execute userByID()

module.exports = router;
