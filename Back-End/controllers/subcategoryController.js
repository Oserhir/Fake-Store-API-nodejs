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

//  @desc Get specific subCategory
//  @route GET /api/subcategory/:subcategoryId
//  @access Public
exports.getsubCategory = (req, res) => {
  res.send({ subcategory: req.subcategory });
};

//  @desc Get List of subCategories
//  @route GET /api/subcategory?page=2&limit=1
//  @access Public
exports.getsubCategories = (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit || 5;
  const skip = (page - 1) * limit;

  subCategoryModel
    .find()
    .skip(skip)
    .limit(limit)
    .exec((err, subcategories) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }

      res.json({
        page: page,
        subcategories: subcategories,
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

//  Get subategory information Using Category ID
exports.subCategoryById = (req, res, next, id) => {
  subCategoryModel.findById(id).exec((err, subCategory) => {
    if (err || !subCategory) {
      return res.status(404).json({
        errors: "subCategory not found !",
      });
    }
    req.subcategory = subCategory;
    next();
  });
};
