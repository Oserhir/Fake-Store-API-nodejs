const express = require("express");
const router = express.Router();

const {
  addAddress,
  removeAddress,
  getLoggedUserAddresses,
} = require("../controllers/addressController");

const { isAuth, requireLogIn, allowedTo } = require("../middlewares/auth");

// @desc  Add address to user addresses list
router.post("/", [requireLogIn, allowedTo("user")], addAddress);

// @desc  Remove address from user addresses list
router.delete("/:id", [requireLogIn, allowedTo("user")], removeAddress);

// / @desc  Get logged user addresses list
router.get("/", [requireLogIn, allowedTo("user")], getLoggedUserAddresses);

module.exports = router;
