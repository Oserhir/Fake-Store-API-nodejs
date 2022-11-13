const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      //required: [true, "Category required"],
    },
    ratings: {
      type: Number,
      min: 1,
      Max: 5,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: [true, "Review must belong to user"],
    },
    product: {
      type: ObjectId,
      ref: "Product",
      required: [true, "Review must belong to product"],
    },
  },
  { timestamps: true }
);

const reviewModel = mongoose.model("Category", reviewSchema);
module.exports = reviewModel;
