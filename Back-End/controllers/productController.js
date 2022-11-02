const productModel = require("../models/productSchema");

exports.createProduct = (req, res) => {
  const { name, description, price, quantity, category } = req.body;

  const image = req.file.path;

  if (req.file == null) {
    res.status(400).json({ error: "image could not upload" });
  }

  productModel
    .create({ name, description, price, quantity, image, category })
    .then((product) => {
      res.status(201).json({ data: product });
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};
