const brandModel = require("../models/brandsSchema");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const APIError = require("../utils/APIError");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid"); // create a random UUID
const sharp = require("sharp");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddlewares");

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
exports.createBrand = (req, res) => {
  //const { name } = req.body;
  req.body.slug = slugify(req.body.name);

  brandModel.findOne({ name: req.body.name }).then((brand) => {
    if (brand) {
      res.status(400).send("Brand already exists");
    } else {
      brandModel
        .create(req.body)
        .then((brand) => {
          res.status(201).json({ data: brand });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    }
  });
};

// @desc Get specific Brand
exports.getBrand = (req, res) => {
  res.send({ brand: req.brand });
};

// @desc Get List of Brands
exports.getBrands = (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit || 5;
  const skip = (page - 1) * limit;

  brandModel
    .find()
    .skip(skip)
    .limit(limit)
    .exec((err, brands) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }

      res.json({
        page: page,
        brands: brands,
      });
    });
};

// @desc Update specific Brand
exports.updateBrand = (req, res) => {
  let brand = req.brand;
  brand.image = req.body.image;

  brand.save((err, brand) => {
    if (err) {
      return res.status(400).json({ err: "bad request !" });
    }
  });

  res.json({ brand, message: "Brand updated" });
};

// @desc Delete specific Brand
exports.deleteBrand = (req, res) => {
  let brand = req.brand;

  brand.remove((err, brand) => {
    if (err || !brand) {
      return res.status(400).json({ err: "brand not found!" });
    }

    res.status(204).json({});
  });
};

// @desc Get Brand information Using Category ID
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
