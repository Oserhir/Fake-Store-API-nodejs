// Require the NPM packages that we need
const express = require("express");
const app = express();
require("dotenv").config(); // access environment variables
const db = require("./config/database"); // Connect to Database
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Middleware
// This allows us to pass data from the form
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Parse Cookie header
app.use(cookieParser());

// Import Routes
const useRouters = require("./router/users");
// Routes Middlware
app.use("/api/users", useRouters);

const PORT = process.env.PORT || 3000; // // Set a default environment port or cutom port - 3000

// Start out application
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
