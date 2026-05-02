const mongoose = require("mongoose");

const savedSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one saved list per user
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        size: {
          type: String,
          enum: ["S", "M", "L", "XL"],
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Saved", savedSchema);
