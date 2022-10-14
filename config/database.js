const mongoose = require("mongoose");
require("dotenv").config(); // access environment variables

const dbURL = process.env.dbDatabaseURL;

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("Connect to MongooDB....");
  })
  .catch((err) => {
    console.log(err);
  });
