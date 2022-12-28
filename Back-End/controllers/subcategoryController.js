const subCategoryModel = require("../models/subcategorySchema");
const slugify = require("slugify");
const factory = require("./handlersFactory");

exports.setCategoryTobody = (req, res, next) => {
  if (req.params.categoryId) req.body.category = req.params.categoryId;
  next();
};

//  @desc create subcategory
exports.createsubCategory = factory.createOne(subCategoryModel);

// exports.createsubCategory = (req, res) => {
//   const { name, category } = req.body;
//   subCategoryModel.findOne({ name: name }).then((subcategory) => {
//     if (subcategory) {
//       res.status(400).send("subCategory already exists");
//     } else {
//       subCategoryModel
//         .create({ name, slug: slugify(name), category })
//         .then((subcategory) => {
//           res.status(201).json({ data: subcategory });
//         })
//         .catch((err) => {
//           res.status(400).send(err);
//         });
//     }
//   });
// };

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

// @desc Delete specific subCategory
exports.deleteSubCategory = (req, res) => {
  let subcategory = req.subcategory;

  subcategory.remove((err, subcategory) => {
    if (err || !subcategory) {
      return res.status(400).json({ err: "subcategory not found!" });
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
