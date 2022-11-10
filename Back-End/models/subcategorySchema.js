const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

// Create Schema
const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 32,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      require: true,
    },
  },
  { timestamps: true }
);

// Create model
const subcategoryModel = mongoose.model("SubCategory", subcategorySchema);
module.exports = subcategoryModel;
