const express = require("express");
const app = express();
const router = express.Router();
const { login_get } = require("../controllers/userController");

router.get("/", login_get);

module.exports = router;
