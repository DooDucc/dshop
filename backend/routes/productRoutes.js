const express = require("express");
const {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToFavProducts,
  rating,
  getRatings,
  replyRating,
} = require("../controllers/productController");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/:id", getProduct);
router.put("/favproducts", authMiddleware, addToFavProducts);
router.post("/rating", authMiddleware, rating);
router.put("/reply-rating", authMiddleware, replyRating);
router.get("/ratings/:prodId", authMiddleware, getRatings);

router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

router.get("/", getAllProducts);

module.exports = router;
