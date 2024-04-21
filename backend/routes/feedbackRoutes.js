const express = require("express");
const {
  createFeedback,
  updateFeedbackStatus,
  deleteFeedback,
  getFeedback,
  getFeedbacks,
  replyFeedback,
} = require("../controllers/feedbackController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", createFeedback);
router.put("/status/:id", authMiddleware, isAdmin, updateFeedbackStatus);
router.put("/reply/:id", authMiddleware, isAdmin, replyFeedback);
router.delete("/:id", authMiddleware, isAdmin, deleteFeedback);
router.get("/:id", getFeedback);
router.get("/", getFeedbacks);

module.exports = router;
