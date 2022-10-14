const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      minlenght: 50,
      trim: true,
    },

    email: {
      type: String,
      require: true,
      maxlenght: 50,
      trim: true,
      unique: true,
    },
    hashed_password: {
      type: String,
      require: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
