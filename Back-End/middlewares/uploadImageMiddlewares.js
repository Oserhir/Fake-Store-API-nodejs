// Configuration for Multer
const multer = require("multer");

exports.uploadSingleImage = (fileName) => {

  const storage = multer.memoryStorage();

  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new Error("Only Images Allowed"), false);
    }
  };

  const upload = multer({ storage: storage, fileFilter: multerFilter });
  return upload.single(fileName);
};
