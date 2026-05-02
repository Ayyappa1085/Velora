const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getWishlist,
  toggleWishlist,
} = require("../controllers/wishlistController");

router.get("/", protect, getWishlist);
router.post("/", protect, toggleWishlist);

module.exports = router;