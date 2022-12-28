const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/APIError");

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);
    console.log(req.body);
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
