const mongoose = require("mongoose");
require("dotenv").config();

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

const setImageUrl = (doc) => {
  console.log(doc.image);
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
    doc.image = imageUrl;
  }
};

brandSchema.post("init", (doc) => {
  setImageUrl(doc);
});

brandSchema.post("save", (doc) => {
  setImageUrl(doc);
});

// Create model
const BrandModel = mongoose.model("Brand", brandSchema);
module.exports = BrandModel;
