const mongoose = require("mongoose");
// Create Schema
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand required"],
      unique: [true, "Brand must be unique"],
      minlength: [3, "Too short brand name"],
      maxlength: [32, "Too long brand name"],
    },
    image: String,
  },
  { timestamps: true }
);

// Create model
const BrandModel = mongoose.model("Brand", brandSchema);
module.exports = BrandModel;
