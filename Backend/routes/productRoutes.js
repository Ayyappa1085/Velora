const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  updateStock,
} = require("../controllers/productController");

// PUBLIC
router.get("/", getProducts);

// ADMIN
router.post("/", protect, adminOnly, upload.single("image"), addProduct);

router.put("/stock/:id", protect, adminOnly, updateStock);

router.put("/:id", protect, adminOnly, updateProduct);

router.delete("/:id", protect, adminOnly, deleteProduct);

// PUBLIC
router.get("/:id", getProductById);

module.exports = router;
