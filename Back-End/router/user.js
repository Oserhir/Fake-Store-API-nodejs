const express = require("express");
const router = express.Router();
const {
  createUserValidator,
  updateUserValidator,
} = require("../utils/validators/userValidators");

const {
  updateUser,
  getUser,
  getallusers,
  createUser,
  deleteUser,
} = require("../controllers/userController");
const { userById } = require("../middlewares/user");
const { requireSignIn, isAuth, isAdmin } = require("../middlewares/auth");
const { requireLogIn } = require("../controllers/authController");

router.get("/:userId", getUser); // Get a single user
router.get("/", getallusers); // Get all users
router.post("/", createUserValidator, createUser); // Create a user
router.put(
  "/:userId",
  // [requireSignIn, isAuth],
  updateUserValidator,
  updateUser
); // Update a user
router.delete("/:userId", deleteUser); // Delete a user

// router.get("/profile/:userId", requireSignIn, isAuth, getOneUser_get);
router.param("userId", userById); // Any route contain "userId" my app will execute userByID()

module.exports = router;
