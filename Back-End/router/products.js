const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/productController");
const { requireSignIn, isAuth, isAdmin } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");

router.post("/create/:userId", [requireSignIn, isAuth, isAdmin], createProduct);
router.param("userId", userById);

module.exports = router;
