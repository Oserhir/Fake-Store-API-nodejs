const brandModel = require("../models/brandsSchema");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const APIError = require("../utils/APIError");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid"); // create a random UUID
const sharp = require("sharp");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddlewares");
const factory = require("./handlersFactory");

// Upload Single Image
exports.uploadBrandImage = uploadSingleImage("image");

// Image Processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const fileName = `brand-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/brands/${fileName}`);

  // Save image into our DB
  req.body.image = fileName;
  next();
});

// @desc Add new Brand
exports.createBrand = factory.createOne(brandModel);

// @desc Get specific Brand
exports.getBrand = factory.getOne(brandModel);

// @desc Get List of Brands
exports.getBrands = factory.getAll(brandModel);

// @desc Update specific Brand
exports.updateBrand = factory.updateOne(brandModel, "Brand");

// @desc Delete specific Brand
exports.deleteBrand = factory.deleteOne(brandModel, "Brand");

// @desc Get Brand information Using BrandID
exports.brandById = (req, res, next, id) => {
  brandModel.findById(id).exec((err, brand) => {
    if (err || !brand) {
      // return res.status(404).json({
      //   errors: "Category not found !",
      // });
      return next(new APIError(`Brand not found !`, 404));
    }

    req.brand = brand;
    next();
  });
};
