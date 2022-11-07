const express = require("express");
const app = express();
const router = express.Router();

const {
  //allsubCategories,
  //getsubCategory,
  createsubCategory,
  // subcategoryById,
  //updatesubCategory,
  // deletesubCategory,
} = require("../controllers/subcategoryController");

const { requireSignIn, isAuth, isAdmin } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");

// // allsubCategories
// router.get("/", allsubCategories);

// // showsubCategory
// router.get("/:categoryId", getsubCategory);

// Create subCategory
router.post(
  "/create/:userId",
  [requireSignIn, isAuth, isAdmin],
  createsubCategory
);

// // update
// router.put(
//   "/:categoryId/:userId",
//   [requireSignIn, isAuth, isAdmin],
//   updatesubCategory
// );

// // Delete
// router.delete(
//   "/:categoryId/:userId",
//   [requireSignIn, isAuth, isAdmin],
//   deletesubCategory
// );

router.param("userId", userById);
// router.param("categoryId", subcategoryById);

module.exports = router;
