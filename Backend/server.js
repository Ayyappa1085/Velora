const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");

const wishlistRoutes = require("./routes/wishlistRoutes");
const cartRoutes = require("./routes/cartRoutes");
const savedRoutes = require("./routes/savedRoutes");

const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

app.set("trust proxy", 1);

/* ================= CORS (FIXED) ================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "https://your-frontend.vercel.app", // 🔥 replace after deploy
    ],
    credentials: true,
  })
);

/* ================= MIDDLEWARE ================= */
app.use(express.json());

/* ================= ROUTES ================= */
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/saved", savedRoutes);

app.use("/api/payment", paymentRoutes);

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.send("Velora Backend Running");
});

/* ================= DB CONNECTION ================= */
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("MongoDB Connected");

    mongoose.connection.db
      .admin()
      .command({ ping: 1 })
      .then(() => console.log("MongoDB Ready for operations"))
      .catch(() => console.log("Mongo ping failed"));
  })
  .catch((err) => {
    console.log("Mongo Error:", err);
  });

/* ================= ERROR HANDLER (NEW) ================= */
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});