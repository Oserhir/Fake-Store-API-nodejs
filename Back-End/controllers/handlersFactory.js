const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/APIError");

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ data: newDoc });
  });

exports.updateOne = (Model, name = "document") =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
      return next(new ApiError(`No ${name} for this id ${req.params.id}`, 404));
    }
    // Trigger "save" event when update document
    document.save();
    res.status(200).json({ data: document });
  });

exports.deleteOne = (Model, name = "document") =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);

    if (!document) {
      return next(new ApiError(`No ${name} for this id ${id}`, 404));
    }

    // Trigger "remove" event when update document
    document.remove();
    res.status(204).send();
  });

exports.getOne = (Model, populationOpt) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // 1) Build query
    let query = Model.findById(id);
    if (populationOpt) {
      query = query.populate(populationOpt);
    }

    // 2) Execute query
    const document = await query;

    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (Model, modelName = "") =>
  asyncHandler(async (req, res) => {
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

    Model.find(queryStr)
      .select(fields)
      // .populate({ path: "category", select: "name _id" })
      .sort(sortedBy)
      .skip(skip)
      .limit(limit)

      .exec((err, document) => {
        if (err) {
          return res.status(404).json({ error: "document not found !" });
        }

        res.json({ page: page, result: document.length, data: document });
      });
  });
