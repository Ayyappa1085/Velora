const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");

// 🔥 EXISTING
const wishlistRoutes = require("./routes/wishlistRoutes");
const cartRoutes = require("./routes/cartRoutes");

// 🔥 NEW (ADD THIS)
const savedRoutes = require("./routes/savedRoutes");

const app = express();

// 🔥 REQUIRED (fix for rate-limit + proxy environments)
app.set("trust proxy", 1);

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

// 🔥 EXISTING
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);

// 🔥 NEW ROUTE (CRITICAL)
app.use("/api/saved", savedRoutes);

// 🔥 MONGODB CONNECTION
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("MongoDB Connected");

    mongoose.connection.db
      .admin()
      .command({ ping: 1 })
      .then(() =>
        console.log("MongoDB Ready for operations")
      )
      .catch(() => console.log("Mongo ping failed"));
  })
  .catch((err) => {
    console.log("Mongo Error:", err);
  });

app.get("/", (req, res) => {
  res.send("Velora Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});