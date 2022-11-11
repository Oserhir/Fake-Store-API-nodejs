const productModel = require("../models/productSchema");
const categoryModel = require("../models/categorySchema");
const subCategoryModel = require("../models/subcategorySchema");
const Joi = require("joi");
const _ = require("lodash");
const slugify = require("slugify");

const ObjectId = require("mongoose").Types.ObjectId;

//  @desc create Product // Done
exports.createProduct = (req, res) => {
  // req.body.slug = slugify(req.body.title);

  productModel
    .create(req.body)
    .then((product) => {
      res.status(201).json({ data: product });
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};

//  @desc update Product  // Done
exports.updateProduct = (req, res) => {
  const { productId } = req.params; //  const { id } = req.product._id;
  req.body.slug = slugify(req.body.title);

  productModel.findOneAndUpdate(
    { _id: productId },
    req.body,
    { new: true },
    (err, doc) => {
      if (err) {
        res.status(400).json({ err: "Something wrong when updating data!" });
      }

      res.json({ data: doc });
    }
  );
};

//  @desc Delete Product
exports.removeProduct = (req, res) => {
  let product = req.product;
  product.remove((err, product) => {
    if (err) {
      return res.status(404).json({ error: "Product not found !" });
    }
  });

  res.status(204).json({});
};

//
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

//  @desc Get  Product
exports.getProduct = (req, res) => {
  res.json({
    data: req.product,
  });
};

//  @desc Get List of Products
exports.getProducts = (req, res) => {
  // Filtering ( price , ratingsAverage )
  const queryStringObject = { ...req.query }; // { limit: '10', price: '15', ratingsAverage: '4', page: '2' }
  const excludeFields = ["sortedBy", "order", "limit", "page"];
  excludeFields.forEach((field) => delete queryStringObject[field]); // { price: '15', ratingsAverage: '4' }

  // apply Filteration using [gte,gt,le,lte]
  let queryStr = JSON.stringify(queryStringObject);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  queryStr = JSON.parse(queryStr);

  // Pagination
  const limit = req.query.limit ? parseInt(req.query.limit) : 100;
  const page = req.query.page * 1 || 1;
  const skip = (page - 1) * limit;

  // Sorting
  let sortedBy = "-createdAt"; // sorted By Newest
  if (req.query.sortedBy) {
    // change "price ,-sold" =>  [ price ,-sold ] =>  "price -sold"
    sortedBy = req.query.sortedBy.split(",").join(" ");
  }

  // Apply Field Limiting Feature
  let fields = "-__v -imageCover -images";
  if (req.query.fields) {
    // change "title,sold" =>  [ title ,sold ] =>  "title sold"
    fields = req.query.fields.split(",").join(" ");
  }

  // Apply Search Feature
  let Search = {};
  if (req.query.keyword) {
    // { '$or': [ { title: [Object] }, { description: [Object] } ] }
    Search.$or = [
      { title: { $regex: req.query.keyword, $options: "i" } },
      { description: { $regex: req.query.keyword, $options: "i" } },
    ];
  }

  productModel
    //.find(queryStr)
    .find(Search)
    //.select("-imageCover")
    .select(fields)
    //.populate({ path: "category", select: "name _id" })
    .sort(sortedBy)
    .skip(skip)
    .limit(limit)

    .exec((err, products) => {
      if (err) {
        return res.status(404).json({ error: "Products not found !" });
      }

      res.json({ page: page, result: products.length, data: products });
    });
};

//  desc Get  Related Product
exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  productModel
    .find({ category: req.product.category, _id: { $ne: req.product._id } })
    .limit(limit)
    .select("-image")
    .populate("category", "_id name")
    .exec((err, products) => {
      if (err) {
        res.status(404).json({ err: "Produts not found !" });
      }

      res.json(products);
    });
};

exports.searchProduct = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  console.log(req.body.filters);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  productModel
    .find(findArgs)
    .select("-image")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

// Validator function
const isValidObjectId = (id) => {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
};
