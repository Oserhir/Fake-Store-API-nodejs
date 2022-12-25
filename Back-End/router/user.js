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
  getLoggedUserData,
  updateLoggedData,
} = require("../controllers/userController");
const { userById } = require("../middlewares/user");

const { isAuth, requireLogIn, allowedTo } = require("../middlewares/auth");
const { route } = require("./auth");

router.get(
  "/getMe",
  requireLogIn,
  allowedTo("user", "admin"),
  getLoggedUserData,
  getUser
);


// Admin

router.use(requireLogIn);

// @desc Get a single user @access Private/Admin
router.get("/:userId", allowedTo("admin"), getUser);

// @desc Get all users @access Private/Admin
router.get("/", allowedTo("admin"), getallusers);

// @desc Create a user @access Private/Admin
router.post("/", allowedTo("admin"), createUserValidator, createUser);

// @desc Update a user @access Private/Admin
router.put("/:userId", allowedTo("admin"), updateUserValidator, updateUser);

// @desc Delete a user @access Private/Admin
router.delete("/:userId", allowedTo("admin"), deleteUserValidator, deleteUser);

// @desc Change Password @access Private/Admin
router.put(
  "/changeMyPassword/:userId",
  allowedTo("admin"),
  changePasswordValidator,
  changePasswords
);

router.param("userId", userById); // @desc Any route contain "userId" my app will execute userByID()

module.exports = router;
