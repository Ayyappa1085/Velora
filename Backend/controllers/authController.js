const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ================= REGISTER ================= */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const exists = await User.findOne({ email: normalizedEmail });

    if (exists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: "user",
    });

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Register failed",
    });
  }
};

/* ================= LOGIN ================= */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // 🔥 INCLUDE tokenVersion (CRITICAL FIX)
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        tokenVersion: user.tokenVersion,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch {
    res.status(500).json({
      message: "Login failed",
    });
  }
};

/* ================= GET ME ================= */
const getMe = async (req, res) => {
  try {
    // req.user already comes from middleware
    res.status(200).json(req.user);
  } catch {
    res.status(500).json({
      message: "Failed to fetch user",
    });
  }
};

/* ================= LOGOUT (REAL) ================= */
const logoutUser = async (req, res) => {
  try {
    // 🔥 INCREMENT tokenVersion → invalidates ALL old tokens
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { tokenVersion: 1 },
    });

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch {
    res.status(500).json({
      message: "Logout failed",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
};
