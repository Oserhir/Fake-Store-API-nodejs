const Product = require("../models/productSchema");
const Cart = require("../models/cartSchema");
const Coupon = require("../models/couponSchema");
const ApiError = require("../utils/APIError");
const asyncHandler = require("express-async-handler");

// @desc Add product to cart
exports.addProductToCart = asyncHandler(async (req, res, next) => {
  const { productId, color } = req.body;
  const product = await Product.findById(productId);

  // Get Cart for logged user
  let cart = await Cart.findOne({ user: req.crUser._id });

  if (!cart) {
    // create cart fot logged user with product
    cart = await Cart.create({
      user: req.crUser._id,
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
  }

  // Calculate total cart price
  calcTotalCartPrice(cart);
  await cart.save();

  res.status(200).json({
    status: "success",
    message: "Product added to cart successfully",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

// @Desc get Logged User Cart
exports.getLoggedUserCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.crUser._id });

  if (!cart) {
    return next(
      new ApiError(`There is no cart for this user id : ${req.crUser._id}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

// @desc remove Specific Cart Item
exports.removeSpecificCartItem = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.crUser._id },
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

// @Desc Update specific cart item quantity
exports.updateCartItemQuantity = asyncHandler(async (req, res, next) => {
  const { quantity } = req.body;

  const cart = await Cart.findOne({ user: req.crUser._id });

  if (!cart) {
    return next(
      new ApiError(`there is no cart for user ${req.crUser._id}`, 404)
    );
  }

  const itemIndex = cart.cartItems.findIndex(
    (item) => item._id.toString() === req.params.itemId
  );

  if (itemIndex > -1) {
    const cartItem = cart.cartItems[itemIndex];
    cartItem.quantity = quantity;
    cart.cartItems[itemIndex] = cartItem;
  } else {
    return next(
      new ApiError(`there is no item for this id :${req.params.itemId}`, 404)
    );
  }

  //
  let coupon;
  let totalPrice = calcTotalCartPrice(cart);

  if (cart.coupon) {
    coupon = await Coupon.findById(cart.coupon);

    //  Calculate price after priceAfterDiscount
    const totalPriceAfterDiscount = (
      totalPrice -
      (totalPrice * coupon.discount) / 100
    ).toFixed(2); // 99.23

    cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
  }

  cart.totalCartPrice = totalPrice;

  await cart.save();

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

// @Desc Apply coupon on logged user cart
exports.applyCoupon = asyncHandler(async (req, res, next) => {
  // Get coupon based on coupon name
  const coupon = await Coupon.findOne({
    name: req.body.coupon,
    expire: { $gt: Date.now() },
  });

  if (!coupon) {
    return next(new ApiError(`Coupon is invalid or expired`));
  }

  // 2) Get logged user cart to get total cart price
  const cart = await Cart.findOne({ user: req.crUser._id });

  if (cart) {
    const totalPrice = cart.totalCartPrice;

    // Calculate price after priceAfterDiscount
    const totalPriceAfterDiscount = (
      totalPrice -
      (totalPrice * coupon.discount) / 100
    ).toFixed(2); // 99.23

    cart.coupon = coupon._id;
    cart.totalPriceAfterDiscount = totalPriceAfterDiscount;

    await cart.save();

    res.status(200).json({
      status: "success",
      numOfCartItems: cart.cartItems.length,
      data: cart,
    });
  } else {
    return next(
      new ApiError(
        `There is no cart to apply coupon for this user id : ${req.crUser._id}`
      )
    );
  }
});

// @Desc clear logged user cart
exports.clearCart = asyncHandler(async (req, res, next) => {
  await Cart.findOneAndDelete({ user: req.crUser._id });
  res.status(204).send();
});

calcTotalCartPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });

  return totalPrice;
};
