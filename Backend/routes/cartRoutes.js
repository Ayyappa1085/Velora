const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart, // ✅ ADD THIS
} = require("../controllers/cartController");

// ❌ REMOVE (not needed anymore)
// const Cart = require("../models/Cart");

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.post("/remove", protect, removeFromCart);
router.put("/update", protect, updateQuantity);

// 🔥 FIXED: USE CONTROLLER (NO DUPLICATE LOGIC)
router.post("/clear", protect, clearCart);

module.exports = router;
