const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* ================= PROTECT (VERIFY TOKEN + FETCH USER) ================= */
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token, unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // 🔥 CRITICAL FIX: TOKEN INVALIDATION CHECK
    if (decoded.tokenVersion !== user.tokenVersion) {
      return res.status(401).json({
        message: "Session expired. Please login again.",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

/* ================= ADMIN ONLY ================= */
const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied (admin only)",
    });
  }

  next();
};

module.exports = {
  protect,
  adminOnly,
};
