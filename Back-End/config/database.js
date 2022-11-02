const mongoose = require("mongoose");
require("dotenv").config(); // access environment variables

const dbURL = "mongodb://localhost:27017/petflow";

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("Connect to MongooDB....");
  })
  .catch((err) => {
    console.log(err);
  });
