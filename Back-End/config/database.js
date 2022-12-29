const mongoose = require("mongoose");
require("dotenv").config(); // access environment variables

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/petflow";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connect to MongooDB....");
  })
  .catch((err) => {
    console.log(err);
  });
