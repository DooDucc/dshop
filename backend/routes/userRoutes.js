const express = require("express");
const router = express.Router();
const {
  register,
  loginUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  getFavProducts,
  blockUser,
  unblockUser,
} = require("../controllers/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", loginUser);
router.put("/password", authMiddleware, updatePassword);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.get("/favProducts", authMiddleware, getFavProducts);
router.get("/all-users", getAllUsers);
router.get("/:id", authMiddleware, isAdmin, getUser);
router.put("/edit-user", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.delete("/:id", deleteUser);

module.exports = router;
