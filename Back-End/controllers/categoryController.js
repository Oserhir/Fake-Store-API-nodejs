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
