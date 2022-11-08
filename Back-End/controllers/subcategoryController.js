const subCategoryModel = require("../models/subcategorySchema");
const slugify = require("slugify");
// const asyncHandler = require("express-async-handler");
// const APIError = require("../utils/APIError");
const Joi = require("joi");

//  @desc create subcategory
//  @route POST /api/subcategory/create/:userId
//  @access Private
exports.createsubCategory = (req, res) => {
  // Joi Validation
  const schema = Joi.object({
    name: Joi.string().min(3).max(31).required(),
    category: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);
  console.log(value);

  if (error) {
    res.status(400).send(error.details[0].message);
  }

  const { name, category } = value;

  subCategoryModel.findOne({ name: name }).then((subcategory) => {
    if (subcategory) {
      res.status(400).send("subCategory already exists");
    } else {
      subCategoryModel
        .create({ name, slug: slugify(name), category })
        .then((subcategory) => {
          res.status(201).json({ data: subcategory });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    }
  });
};

//  Get Category  information Using Category ID
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

//  @desc Get specific Category
//  @route GET /api/category/:categoryId
//  @access Public
exports.getsubCategory = (req, res) => {
  res.send({ category: req.Category });
};

//  @desc Get List of Categories
//  @route GET /api/category?page=2&limit=1
//  @access Public
exports.allsubCategories = (req, res) => {
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

//  @desc Update specific Category
//  @route PUT /api/category/:categoryId/:userId
//  @access Private
exports.updatesubCategory = (req, res) => {
  const nameCategory = req.body.name;

  let category = req.Category;
  category.name = nameCategory;
  category.slug = slugify(nameCategory);

  category.save((err, category) => {
    if (err) {
      return res.status(400).json({ err: "bad request !" });
    }
  });

  res.json({ category, message: "Category updated" });
};

//  @desc Delete specific Category
//  @route Delete /api/category/:categoryId/:userId
//  @access Private
exports.deletesubCategory = (req, res) => {
  let category = req.Category;

  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({ err: "category not found!" });
    }

    res.status(204).json({});
  });
};
