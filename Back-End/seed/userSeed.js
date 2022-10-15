const db = require("../config/database"); // connect to Database
const userClass = require("../models/userSchema"); // define the Schema & Create a model based on that schema

// Add New User
const User = new userClass({
  name: "JavaScript",
  email: "JavaScript@gmail.com",
  password: "123456",
  role: "0",
});

User.save()
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
