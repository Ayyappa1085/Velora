const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
} = require("../controllers/cartController");

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.post("/remove", protect, removeFromCart);
router.put("/update", protect, updateQuantity);

module.exports = router;