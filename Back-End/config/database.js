const mongoose = require("mongoose");
require("dotenv").config(); // access environment variables

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI).then(() => {
  console.log("Connect to MongooDB....");
});
// .catch((err) => {
//   console.log(err);
// });
