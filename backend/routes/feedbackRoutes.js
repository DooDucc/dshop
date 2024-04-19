const express = require("express");
const {
  createFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedback,
  getFeedbacks,
} = require("../controllers/feedbackController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", createFeedback);
router.put("/:id", authMiddleware, isAdmin, updateFeedback);
router.delete("/:id", authMiddleware, isAdmin, deleteFeedback);
router.get("/:id", getFeedback);
router.get("/", getFeedbacks);

module.exports = router;
