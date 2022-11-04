const express = require("express");
const router = express.Router();
const {
  listRelated,
  allProducts,
  createProduct,
  showProduct,
  productById,
  removeProduct,
  updateProduct,
} = require("../controllers/productController");
const { requireSignIn, isAuth, isAdmin } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");
const multer = require("multer");

//Configuration for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    //cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`);
    cb(
      null,
      `${joinString(
        noSpecialChars(file.originalname),
        "-"
      )}-${Date.now()}${getExt(file.mimetype)}`
    );
  },
});
const upload = multer({ storage: storage });
const getExt = (mimetype) => {
  switch (mimetype) {
    case "image/png":
      return ".png";
    case "image/jpeg":
      return ".jpg";
  }
};
const noSpecialChars = (str) => {
  return str.replace(/[^a-zA-Z0-9 ]/g, "");
};
const joinString = (str, char) => {
  return str.split(" ").join(char);
};

// retrieve all products
router.get("/", allProducts);

// retrieve related products
router.get("/related/:productId/", listRelated);

// Create
router.post(
  "/create/:userId",
  upload.single("image"),
  [requireSignIn, isAuth, isAdmin],
  createProduct
);

// Show Single Product
router.get("/:productId/", showProduct);

// Delete
router.delete(
  "/:productId/:userId",
  [requireSignIn, isAuth, isAdmin],
  removeProduct
);

// Update
router.put(
  "/:productId/:userId",
  upload.single("image"),
  [requireSignIn, isAuth, isAdmin],
  updateProduct
);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
