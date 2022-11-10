const productModel = require("../models/productSchema");
const categoryModel = require("../models/categorySchema");
const subCategoryModel = require("../models/subcategorySchema");
const Joi = require("joi");
const _ = require("lodash");
const slugify = require("slugify");

const ObjectId = require("mongoose").Types.ObjectId;

//  desc create Product
//  route POST /api/products/create/:userId
//  access Private
exports.createProduct = (req, res) => {
  // Joi Validation
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(20).max(2000).required(),
    quantity: Joi.number().required(),
    sold: Joi.number(),
    priceAfterDiscount: Joi.number().custom((value, helpers) => {
      if (value >= req.body.price) {
        throw new Error("priceAfterDiscount must be lower than price");
      }
      // Return the value unchanged
      return value;
    }),
    colors: Joi.array(),
    imageCover: Joi.string().required(),
    images: Joi.array(),
    price: Joi.number().max(20000).required(),
    category: Joi.string()
      .required()
      .custom((id, helpers) => {
        // check if the id is valid MongoDB ObjectId
        if (!isValidObjectId(id)) {
          return helpers.error(`${id} Not a valid ObjectId!'`);
          // throw new Error(`${id} Not a valid ObjectId!`); // Cas 1
        }
        // Validate Category Existence in Our DB
        categoryModel
          .findById(id)
          .then((category) => {
            if (!category) {
              // (`${id} Category Not Found!`); // Cas 1
              return Promise.reject(new Error("Category Not Found"));
            }
          })
          .catch((err) => {
            console.log(err);
          });

        // Return the value unchanged
        return id;
      }),

    subcategories: Joi.array(),
    // .custom((subCategoriesId) => {
    //   // check if the id is valid MongoDB ObjectId
    //   for (let i = 0; i < subCategoriesId.length; i++) {
    //     if (!isValidObjectId(subCategoriesId[i])) {
    //       res
    //         .status(404)
    //         .json({ err: `${subCategoriesId[i]} Not a valid ObjectId!'` });
    //     }
    //   }
    //   // Validate Subcategories Existence in Our DB
    //   subCategoryModel
    //     .find({ _id: { $exists: true, $in: subCategoriesId } })
    //     .then((result) => {
    //       if (result.length != subCategoriesId.length || result.length < 1) {
    //         res.json({ err: "Invalid subCategories Id" });
    //         //res.status(404).json({ err: `Invalid subCategories Id` });
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    //   // Return the value unchanged
    //   return subCategoriesId;
    // })
    // .custom((value) => {
    //   // Validate That Subcategories Belong to Category
    //   subCategoryModel
    //     .find({
    //       category: req.body.category,
    //     })
    //     .then((subcategories) => {
    //       const subCategoriesInDB = [];
    //       subcategories.forEach((sb) => {
    //         subCategoriesInDB.push(sb._id.toString());
    //       });
    //       // check if subategories ids in  db include subcategories in req.body
    //       const checker = (target, arr) =>
    //         target.every((v) => arr.includes(v));

    //       if (!checker(value, subCategoriesInDB)) {
    //         return Promise.reject(
    //           new Error("subCategories not belong to category")
    //         );
    //       }
    //     });
    // }),
    ////////////////////////////
    brand: Joi.string(),
    ratingsAverage: Joi.number().min(1).max(5),
    ratingsQuantity: Joi.number(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    console.log({ err: error });
    res.status(400).json({ error: error.details[0].message });
  } else {
    console.log({ Finish: value });
  }

  // productModel
  //   .create(value)
  //   .then((product) => {
  //     res.status(201).json({ data: product });
  //   })
  //   .catch((err) => {
  //     res.status(400).json(err.message);
  //   });
};

//  desc update Product
//  route PUT /api/products/:productId/:userId
//  access Private
exports.updateProduct = (req, res) => {
  // Joi Validation
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);
  value.slug = slugify(value.title);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
  }

  let product = req.product;
  product = _.extend(product, value);

  product.save((err, product) => {
    if (err) {
      res.status(400).json({
        error: "Product update failed",
      });
    }

    res.json({ data: product });
  });
};

//  desc Delete Product
//  route DELETE /api/products/:productId/:userId
//  access Private
exports.removeProduct = (req, res) => {
  let product = req.product;
  product.remove((err, product) => {
    if (err) {
      return res.status(404).json({ error: "Product not found !" });
    }
  });

  res.status(204).json({});
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

//  desc Get  Product
//  route GET /api/products/:productId
//  access Public
exports.showProduct = (req, res) => {
  res.json({
    data: req.product,
  });
};

//  desc Get List of Products
//  route GET /api/products
//  access Public
exports.allProducts = (req, res) => {
  let sortedBy = req.query.sortedBy ? req.query.sortedBy : "_id";
  let order = req.query.order ? req.query.order : "asc";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  productModel
    .find()
    .select("-image")
    .populate({ path: "category", select: "name _id" })
    .sort([[sortedBy, order]])
    .limit(limit)
    .exec((err, products) => {
      console.log(products);
      if (err) {
        return res.status(404).json({ error: "Products not found !" });
      }

      res.json({ data: products });
    });
};

//  desc Get  Related Product
//  route GET /api/products/related/:productId/
//  access Public
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
