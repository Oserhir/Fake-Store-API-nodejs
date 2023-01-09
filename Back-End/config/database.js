const mongoose = require("mongoose");
require("dotenv").config(); // access environment variables

const MONGO_URI =
  "mongodb+srv://oserhir:iprktqq3I3Ri5IS3@cluster0.hhy5kle.mongodb.net/fake-store-api?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connect to MongooDB....");
  })
  .catch((err) => {
    console.log(err);
  });
