const fs = require("fs");
require("colors");
const dotenv = require("dotenv"); // access environment variables
const Product = require("../../models/productSchema");
const db = require("../../config/database"); // Connect to Database

console.log("yes");

dotenv.config({ path: "../../config.env" });

// Read data
const products = JSON.parse(fs.readFileSync("./products.json"));

// Insert data into DB
const insertData = async () => {
  try {
    await Product.create(products);

    console.log("Data Inserted".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log("Data Destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// node seeder.js -i == insert Data
if (process.argv[2] === "-i") {
  insertData();
} else if (process.argv[2] === "-d") {
  // node seeder.js -d  == remove Data
  destroyData();
}
