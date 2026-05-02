const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    price: { type: Number, required: true },
    oldPrice: { type: Number, default: 0 },
    category: { type: String, required: true },
    type: { type: String, required: true },
    image: { type: String, default: "" },

    // legacy fallback
    stock: { type: Number, default: 0 },

    // ✅ size-based stock
    sizeStock: {
      S: { type: Number, default: 0 },
      M: { type: Number, default: 0 },
      L: { type: Number, default: 0 },
      XL: { type: Number, default: 0 },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
