const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
// Create Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 150,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
    },
    image: {
      type: String,
      required: true,
    },
    // images: [String],
    category: {
      type: ObjectId,
      ref: "Category",
      require: true,
    },
    shipping: {
      type: Boolean,
      require: false,
      default: false,
    },
    /*  priceAfterDiscount: {
      type: Number,
    }, 
    color: {
      type: [String],
    }, 
     brand: {
      type: mongoose.Schema.ObjectId,
      ref: 'Brand',
    },
    ratingsAverage: {
      type: Number,
      min: [1, 'Rating must be above or equal 1.0'],
      max: [5, 'Rating must be below or equal 5.0'],
      // set: (val) => Math.round(val * 10) / 10, // 3.3333 * 10 => 33.333 => 33 => 3.3
    },
        ratingsQuantity: {
      type: Number,
      default: 0,
    },
    */
  },
  { timestamps: true }
);

// Create model
const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;
