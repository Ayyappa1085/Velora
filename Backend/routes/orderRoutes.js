const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");

// ================= USER =================

// ✅ CREATE ORDER
router.post("/", protect, createOrder);

// ✅ GET ALL ORDERS (user gets own, admin gets all)
router.get("/", protect, getOrders);

// ✅ GET SINGLE ORDER
router.get("/:id", protect, getOrderById);

// ================= ADMIN =================

// ✅ ORIGINAL ROUTE (KEEP)
router.put("/status/:id", protect, adminOnly, updateOrderStatus);

// 🔥 ADD THIS (FIX YOUR 404 ISSUE)
// This matches frontend: /api/orders/:id
router.put("/:id", protect, adminOnly, updateOrderStatus);

module.exports = router;