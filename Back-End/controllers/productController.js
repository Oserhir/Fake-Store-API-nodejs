const productModel = require("../models/productSchema");
const categoryModel = require("../models/categorySchema");
const subCategoryModel = require("../models/subcategorySchema");
const Joi = require("joi");
const _ = require("lodash");
const slugify = require("slugify");
const multer = require("multer");

const factory = require("../controllers/handlersFactory");

const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid"); // create a random UUID

const storage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only Images Allowed"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: multerFilter });

exports.uploadProductImages = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 8 },
]);

// Image Processing
exports.resizeProductImage = asyncHandler(async (req, res, next) => {
  // Image Processing for image Cover
  if (req.files.imageCover) {
    const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/products/${imageCoverFileName}`);

    // Save image into our DB
    req.body.imageCover = imageCoverFileName;
  }

  //2- Image processing for images
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 95 })
          .toFile(`uploads/products/${imageName}`);

        // Save image into our db
        req.body.images.push(imageName);
      })
    );
  }
  next();
});

//  @desc Create a product
exports.createProduct = factory.createOne(productModel);

//  @desc Update a product
exports.updateProduct = factory.updateOne(productModel, "product");

//  @desc Delete a product
exports.removeProduct = factory.deleteOne(productModel, "product");

//  @desc Get a single product
exports.getProduct = factory.getOne(productModel);

//  @desc Get List of Products
exports.getProducts = (req, res) => {
  // Filtering ( price , ratingsAverage )
  const queryStringObject = { ...req.query }; // { limit: '10', price: '15', ratingsAverage: '4', page: '2' }
  const excludeFields = ["sortedBy", "order", "limit", "page", "keyword"];
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
    Search.$or = [
      { title: { $regex: req.query.keyword, $options: "i" } },
      { description: { $regex: req.query.keyword, $options: "i" } },
    ];
  }

  productModel
    .find(queryStr)
    .select(fields)
    // .populate({ path: "category", select: "name _id" })
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

//  @desc Get Related Product
exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  productModel
    .find({ category: req.product.category, _id: { $ne: req.product._id } })
    .limit(limit)
    .select("-image")
    //.populate("category", "_id name")
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
