const CategoryModel = require("../models/categorySchema");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const APIError = require("../utils/APIError");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid"); // create a random UUID
const multer = require("multer");
const sharp = require("sharp");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddlewares");

// Upload Single Image
exports.uploadCategoryImage = uploadSingleImage("image");

// Image Processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const fileName = `category-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/categories/${fileName}`);

  // Save image into our DB
  req.body.image = fileName;
  next();
});

//  @desc Add new Category
exports.createCategory = (req, res) => {
  CategoryModel.create(req.body)
    .then((category) => {
      res.status(201).json({ data: category });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

//  @desc Update specific Category
exports.updateCategory = (req, res) => {
  const { id } = req.params;
  req.body.slug = slugify(req.body.name);
  CategoryModel.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true },
    (err, doc) => {
      if (err) {
        res.status(400).json({ err: "Something wrong when updating data!" });
      }
      res.json({ data: doc, message: "Category updated" });
    }
  );
};

//  @desc Get specific Category
exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await CategoryModel.findById(req.params.id);
  if (!category) {
    return next(new APIError(`No category for this id ${req.params.id}`, 404));
  }
  res.send({ data: category });
});

// @desc Get List of Categories
exports.allCategories = (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit || 5;
  const skip = (page - 1) * limit;

  CategoryModel.find()
    .skip(skip)
    .limit(limit)
    .exec((err, categories) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }

      res.json({
        page: page,
        categories: categories,
      });
    });
};

// @desc Delete a category
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await CategoryModel.findByIdAndRemove(req.params.id);
  if (!category) {
    return next(new APIError(`No category for this id ${req.params.id}`, 404));
  }
  category.remove();
  res.status(204).json({});
});

//  @desc Get Category information Using Category ID
exports.categoryById = (req, res, next, id) => {
  CategoryModel.findById(id).exec((err, category) => {
    if (err || !category) {
      // return res.status(404).json({
      //   errors: "Category not found !",
      // });
      return next(new APIError(`No category for this id ${id}`, 404));
    }

    req.Category = category;
    next();
  });
};
