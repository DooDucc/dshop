const express = require("express");
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  getOrder,
  getMonthOrderRevenue,
  getYearStatistics,
} = require("../controllers/orderController");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, isAdmin, getAllOrders);
router.get("/get-orders", authMiddleware, getUserOrders);
router.get(
  "/get-month-order-income/:year",
  authMiddleware,
  isAdmin,
  getMonthOrderRevenue
);
router.get(
  "/get-year-statistics/:year",
  authMiddleware,
  isAdmin,
  getYearStatistics
);
router.get("/:id", authMiddleware, isAdmin, getOrder);
router.put("/:id", authMiddleware, isAdmin, updateOrderStatus);
router.delete("/:id", authMiddleware, isAdmin, deleteOrder);

module.exports = router;
