const express = require("express");
const app = express();
const router = express.Router();
const { createCategory } = require("../controllers/categoryController");

router.get("/create", createCategory);

module.exports = router;
