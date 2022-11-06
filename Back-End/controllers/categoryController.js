const CategoryModel = require("../models/categorySchema");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

// exports.createCategory = (req, res) => {
//   const { name } = req.body;
//   CategoryModel.findOne({ name: name }).then((category) => {
//     if (category) {
//       res.status(400).send("Category already exists");
//     } else {
//       CategoryModel.create({ name, slug: slugify(name) })
//         .then((category) => {
//           res.status(201).json({ data: category });
//         })
//         .catch((err) => {
//           res.status(400).send(err);
//         });
//     }
//   });
// };

//  @desc create category
//  @route POST /api/category/create/:userId
//  @access Private
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

exports.categoryById = (req, res, next, id) => {
  CategoryModel.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(404).json({
        errors: "Category not found !",
      });
    }

    req.Category = category;
    next();
  });
};

exports.showCategory = (req, res) => {
  res.send({ category: req.Category });
};

//  @desc Get List of Categories
//  @route GET /api/category?page=2&limit=1
//  @access Public
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

exports.updateCategory = (req, res) => {
  let category = req.Category;
  const nameCategory = req.body.name;
  category.name = nameCategory;
  category.slug = slugify(nameCategory);

  category.save((err, category) => {
    if (err) {
      return res.status(400).json({ err: "bad request !" });
    }
  });

  res.json({ category, message: "Category updated" });
};
exports.deleteCategory = (req, res) => {
  let category = req.Category;

  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({ err: "category not found!" });
    }

    res.status(204).json({});
  });
};
