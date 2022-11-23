const Product = require("../models/productSchema");
const Cart = require("../models/cartSchema");
const ApiError = require("../utils/APIError");
const asyncHandler = require("express-async-handler");

// @desc    Add product to cart
// @route   POST /api/cart
// @access  Private/User

exports.addProductToCart = asyncHandler(async (req, res, next) => {
  const { productId, color } = req.body;
  const product = await Product.findById(productId);

  // 1) Get Cart for logged user
  let cart = await Cart.findOne({ user: req.Profile._id });

  if (!cart) {
    // create cart fot logged user with product
    cart = await Cart.create({
      user: req.Profile._id,
      cartItems: [{ product: productId, color, price: product.price }],
    });
  } else {
    console.log("This is Cart");
  }
});
