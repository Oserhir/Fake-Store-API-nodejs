const express = require("express");
const router = express.Router();

const {
  addAddress,
  removeAddress,
  getLoggedUserAddresses,
} = require("../controllers/addressController");

const { requireSignIn, isAuth } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");

router.post(
  "/:userId",
  // [requireSignIn, isAuth],
  addAddress
);

router.delete(
  "/:addressId/:userId",
  // [requireSignIn, isAuth],
  removeAddress
);

router.get(
  "/:userId",
  // [requireSignIn, isAuth],
  getLoggedUserAddresses
);

// Param
router.param("userId", userById);

module.exports = router;
