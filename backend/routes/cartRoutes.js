const express = require("express");
const {
  createCart,
  getUserCart,
  clearCart,
  deleteProductInCart,
  updateProductQuantity,
} = require("../controllers/cartController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getUserCart);
router.post("/", authMiddleware, createCart);
router.delete("/clear-cart", authMiddleware, clearCart);
router.post("/delete-product", authMiddleware, deleteProductInCart);
router.post("/update-product-quantity", authMiddleware, updateProductQuantity);

module.exports = router;
