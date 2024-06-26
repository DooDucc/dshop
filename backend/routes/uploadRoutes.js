const express = require("express");
const {
  uploadImages,
  deleteImages,
} = require("../controllers/uploadController");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto } = require("../middlewares/uploadImage");
const router = express.Router();

router.post("/", uploadPhoto.array("images", 10), uploadImages);

router.delete("/delete-img/:id", deleteImages);

module.exports = router;
