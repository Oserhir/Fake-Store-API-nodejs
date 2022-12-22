const express = require("express");
const router = express.Router();

const {} = require("../utils/validators/BrandValidators");

const { createCashOrder } = require("../controllers/orderController");

const { requireSignIn, isAuth, isAdmin } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");

// Create
router.post("/:cardId/:userId", [requireSignIn, isAuth], createCashOrder);

router.param("userId", userById);

module.exports = router;
