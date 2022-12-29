const subCategoryModel = require("../models/subcategorySchema");
const slugify = require("slugify");
const factory = require("./handlersFactory");

exports.setCategoryTobody = (req, res, next) => {
  if (req.params.categoryId) req.body.category = req.params.categoryId;
  next();
};

//  @desc create subcategory
exports.createsubCategory = factory.createOne(subCategoryModel);

//  @desc Get specific subCategory
exports.getsubCategory = (req, res) => {
  res.send({ subcategory: req.subcategory });
};

//  @desc Get List of subCategories
exports.getsubCategories = (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit || 5;
  const skip = (page - 1) * limit;

  filterObject = {};

  if (req.params.categoryId) {
    filterObject = { category: req.params.categoryId };
  }

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
exports.updatesubCategory = factory.updateOne(subCategoryModel, "subcategory");

// @desc Delete specific subCategory
exports.deleteSubCategory = factory.deleteOne(subCategoryModel, "subcategory");

//  @desc Get subategory information Using Category ID
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
