const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
  logoutUser, // 🔥 ADDED
} = require("../controllers/authController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const rateLimit = require("express-rate-limit");

// LOGIN LIMIT
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many login attempts. Try again later." },
});

// REGISTER LIMIT
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: { message: "Too many accounts created. Try later." },
});

// ROUTES
router.post("/register", registerLimiter, registerUser);
router.post("/login", loginLimiter, loginUser);
router.get("/me", protect, getMe);

// 🔥 CRITICAL: REAL LOGOUT ROUTE
router.post("/logout", protect, logoutUser);

module.exports = router;
