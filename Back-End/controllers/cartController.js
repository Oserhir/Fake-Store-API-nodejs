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
    // product exist in cart, update product quantity
    const productIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId && item.color === color
    );

    if (productIndex > -1) {
      const cartItem = cart.cartItems[productIndex];
      cartItem.quantity += 1;
      cart.cartItems[productIndex] = cartItem;
    } else {
      // product not exist in cart,  push product to cartItems array
      cart.cartItems.push({ product: productId, color, price: product.price });
    }

    // calculate total cart price
    let totalPrice = 0;
    cart.cartItems.forEach((item) => {
      totalPrice += item.quantity * item.price;
    });

    cart.totalCartPrice = totalPrice;
    cart.totalPriceAfterDiscount = undefined;
    await cart.save();

    res.status(200).json({
      status: "success",
      message: "Product added to cart successfully",
      numOfCartItems: cart.cartItems.length,
      data: cart,
    });
  }
});

// get Logged User Cart
exports.getLoggedUserCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.Profile._id });

  if (!cart) {
    return next(
      new ApiError(`There is no cart for this user id : ${req.user._id}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

// remove Specific Cart Item
exports.removeSpecificCartItem = asyncHandler(async (req, res, next) => {


  const cart = await Cart.findOneAndUpdate(
    { user: req.Profile._id },
    {
      $pull: { cartItems: { _id: req.params.itemId } },
    },
    { new: true }
  );

  cart.totalCartPrice = calcTotalCartPrice(cart);
 
  cart.save();

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

calcTotalCartPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });

  return totalPrice;
};
