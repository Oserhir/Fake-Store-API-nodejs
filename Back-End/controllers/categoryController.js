const CategoryModel = require("../models/categorySchema");
const slugify = require("slugify");

exports.createCategory = (req, res) => {
  const { name } = req.body;
  CategoryModel.findOne({ name: name }).then((category) => {
    if (category) {
      res.status(400).send("Category already exists");
    } else {
      CategoryModel.create({ name, slug: slugify(name) })
        .then((category) => {
          res.status(201).json({ data: category });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    }
  });
};

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
