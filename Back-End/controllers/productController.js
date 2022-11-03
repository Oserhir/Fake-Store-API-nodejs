const productModel = require("../models/productSchema");
const Joi = require("joi");

exports.createProduct = (req, res) => {
  // Joi Validation
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    category: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
  }
  // image not Found
  if (req.file == null) {
    res.status(400).json({ error: "image could not upload" });
  }

  // image should be less than 3MB in size
  if (req.file.size > Math.pow(10, 6) * 3) {
    return res
      .status(400)
      .json({ error: "File size exceeds the allowable limit of(3MB)" });
  }

  const { name, description, price, quantity, category } = value;
  const image = req.file.path;

  productModel
    .create({ name, description, price, quantity, image, category })
    .then((product) => {
      res.status(201).json({ data: product });
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};

exports.productById = (req, res, next, id) => {
  productModel.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(404).json({
        errors: "Product not found !",
      });
    }

    req.product = product;
    next();
  });
};

exports.showProduct = (req, res) => {
  res.json({
    data: req.product,
  });
};

exports.removeProduct = (req, res) => {
  let product = req.product;
  product.remove((err, product) => {
    if (err) {
      return res.status(404).json({ error: "Product not found !" });
    }
  });

  res.status(204).json({});
};
