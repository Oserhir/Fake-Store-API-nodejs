const CategoryModel = require("../models/categorySchema");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const APIError = require("../utils/APIError");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid"); // create a random UUID
const multer = require("multer");

// Configuration for Multer -  Disk Storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/categories");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1]; // "category-${id}-date.now().jpeg"
    fileName = `category-${uuidv4()}-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only Images Allowed"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: multerFilter });
exports.uploadCategoryImage = upload.single("image");

//  @desc create category
exports.createCategory = (req, res) => {
  const { name } = req.body;
  console.log(req.file);
  // CategoryModel.findOne({ name: name }).then((category) => {
  //   if (category) {
  //     res.status(400).send("Category already exists");
  //   } else {
  //     CategoryModel.create({ name, slug: slugify(name) })
  //       .then((category) => {
  //         res.status(201).json({ data: category });
  //       })
  //       .catch((err) => {
  //         res.status(400).send(err);
  //       });
  //   }
  // });
};

//  @desc Update specific Category
exports.updateCategory = (req, res) => {
  const { categoryId } = req.params;
  req.body.slug = slugify(req.body.name);

  CategoryModel.findOneAndUpdate(
    { _id: categoryId },
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
exports.getCategory = (req, res) => {
  res.send({ category: req.Category });
};

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

// @desc Delete specific Category
exports.deleteCategory = (req, res) => {
  let category = req.Category;

  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({ err: "category not found!" });
    }

    res.status(204).json({});
  });
};

//  @desc Get Category information Using Category ID
exports.categoryById = (req, res, next, id) => {
  CategoryModel.findById(id).exec((err, category) => {
    if (err || !category) {
      // return res.status(404).json({
      //   errors: "Category not found !",
      // });
      return next(new APIError(`Category not found !`, 404));
    }

    req.Category = category;
    next();
  });
};
