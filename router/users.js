const express = require("express");
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.send("user Module");
});

module.exports = router;
