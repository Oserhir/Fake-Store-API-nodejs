const express = require("express");
const app = express();
require("dotenv").config(); // acceder les variable environnement

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
