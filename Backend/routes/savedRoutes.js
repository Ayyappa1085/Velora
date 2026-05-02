const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getSaved,
  addToSaved,
  removeFromSaved,
} = require("../controllers/savedController");

router.get("/", protect, getSaved);
router.post("/add", protect, addToSaved);
router.post("/remove", protect, removeFromSaved);

module.exports = router;