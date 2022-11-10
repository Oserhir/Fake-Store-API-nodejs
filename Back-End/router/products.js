const express = require("express");
const router = express.Router();
const {
  searchProduct,
  listRelated,
  getProducts,
  createProduct,
  getProduct,
  productById,
  removeProduct,
  updateProduct,
} = require("../controllers/productController");

const { requireSignIn, isAuth, isAdmin } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");

// const multer = require("multer");

// //Configuration for Multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/images");
//   },
//   filename: function (req, file, cb) {
//     //cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`);
//     cb(
//       null,
//       `${joinString(
//         noSpecialChars(file.originalname),
//         "-"
//       )}-${Date.now()}${getExt(file.mimetype)}`
//     );
//   },
// });
// const upload = multer({ storage: storage });
// const getExt = (mimetype) => {
//   switch (mimetype) {
//     case "image/png":
//       return ".png";
//     case "image/jpeg":
//       return ".jpg";
//   }
// };
// const noSpecialChars = (str) => {
//   return str.replace(/[^a-zA-Z0-9 ]/g, "");
// };
// const joinString = (str, char) => {
//   return str.split(" ").join(char);
// };

// Add new product
router.post(
  "/create/:userId",
  // upload.single("image"),
  [requireSignIn, isAuth, isAdmin],
  createProduct
);

// Update a product
router.put(
  "/:productId/:userId",
  // upload.single("image"),
  [requireSignIn, isAuth, isAdmin],
  updateProduct
);

// Delete a product 
router.delete(
  "/:productId/:userId",
  [requireSignIn, isAuth, isAdmin],
  removeProduct
);

// Get all products // Done
router.get("/", getProducts);

// Get a single product // Done
router.get("/:productId/", getProduct);

// Get related products // Done
router.get("/related/:productId/", listRelated);

// Product Search
router.post("/search", searchProduct);

// Param
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
