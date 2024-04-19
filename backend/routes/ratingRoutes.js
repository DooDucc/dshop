const express = require("express");
const {
  getRatings,
  deleteRating,
  deleteSubRating,
  getRating,
} = require("../controllers/ratingController");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, isAdmin, getRatings);
router.get("/:id", authMiddleware, isAdmin, getRating);
router.delete("/delete-rating/:id", authMiddleware, isAdmin, deleteRating);
router.delete(
  "/delete-subrating/:id/:subRatingId",
  authMiddleware,
  isAdmin,
  deleteSubRating
);

module.exports = router;
