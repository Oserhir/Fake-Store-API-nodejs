const subCategoryModel = require("../models/subcategorySchema");
const slugify = require("slugify");
// const asyncHandler = require("express-async-handler");
// const APIError = require("../utils/APIError");
const Joi = require("joi");

//  @desc create subcategory
//  @route POST /api/subcategories/create/:userId
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
//  @route GET /api/subcategories/:subcategoryId
//  @access Public
exports.getsubCategory = (req, res) => {
  res.send({ subcategory: req.subcategory });
};

//  @desc Get List of subCategories
//  @route GET /api/subcategories?page=2&limit=1
//  @access Public
exports.getsubCategories = (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit || 5;
  const skip = (page - 1) * limit;

  console.log("getsubCategories");
  console.log(req.params);
  console.log(req.Category._id);

  filterObject = {};
  if (req.Category._id) filterObject = { category: req.Category._id };
  // if (req.params.categoryId ) filterObject = { category: req.params.categoryId }; Or

  subCategoryModel
    .find(filterObject)
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

//  @desc Update specific subCategory
//  @route PUT /api/subcategories/:subcategoryId/:userId
//  @access Private
exports.updatesubCategory = (req, res) => {
  const nameSubCategory = req.body.name;

  let subCategory = req.subcategory;
  console.log(subCategory);
  subCategory.name = nameSubCategory;
  subCategory.slug = slugify(nameSubCategory);

  subCategory.save((err, subcategory) => {
    if (err || !subcategory) {
      return res.status(400).json({ err: "bad request !" });
    }
  });

  res.json({ subCategory, message: "subCategory updated" });
};

//  @desc Delete specific subCategory
//  @route Delete /api/subcategories/:subcategoryId/:userId
//  @access Private
exports.deleteSubCategory = (req, res) => {
  let subcategory = req.subcategory;
  subcategory.remove((err, subcategory) => {
    if (err || !subcategory) {
      return res.status(400).json({ err: "subcategory not found!" });
    }

    res.status(204).json({});
  });
};

// Nested Route
//  @desc Get All Subcategories for Specific Category
//  @route GET /api/categories/:categoryId/subcategories
//  @access Public

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
