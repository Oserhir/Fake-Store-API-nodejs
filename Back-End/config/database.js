const mongoose = require("mongoose");
require("dotenv").config(); // access environment variables

const dbURL =
  "mongodb+srv://oserhir:iprktqq3I3Ri5IS3@cluster0.hhy5kle.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("Connect to MongooDB....");
  })
  .catch((err) => {
    console.log(err);
  });
