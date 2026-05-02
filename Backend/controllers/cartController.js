const Cart = require("../models/Cart");
const Product = require("../models/Product");
const mongoose = require("mongoose");

/* ================= GET CART ================= */
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    res.json(cart.items);
  } catch {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

/* ================= ADD TO CART ================= */
const addToCart = async (req, res) => {
  try {
    const { productId, size, quantity = 1 } = req.body;

    if (!productId || !size) {
      return res.status(400).json({ message: "Invalid data" });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const availableStock = product.sizeStock?.[size] ?? product.stock;

    if (availableStock <= 0) {
      return res.status(400).json({
        message: "Out of stock",
      });
    }

    let cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    const index = cart.items.findIndex(
      (item) => item.product.toString() === productId && item.size === size,
    );

    const existingQty = index > -1 ? cart.items[index].quantity : 0;

    if (existingQty + quantity > availableStock) {
      return res.status(400).json({
        message: `Only ${availableStock} items available`,
      });
    }

    if (index > -1) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        size,
        quantity,
      });
    }

    await cart.save();

    const updatedCart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    res.json(updatedCart.items);
  } catch (err) {
    console.log("ADD ERROR:", err);
    res.status(500).json({ message: "Add to cart failed" });
  }
};

/* ================= REMOVE ITEM ================= */
const removeFromCart = async (req, res) => {
  try {
    const { productId, size } = req.body;

    let cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) return res.json([]);

    cart.items = cart.items.filter(
      (item) => !(item.product.toString() === productId && item.size === size),
    );

    await cart.save();

    const updatedCart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    res.json(updatedCart.items);
  } catch {
    res.status(500).json({ message: "Remove failed" });
  }
};

/* ================= UPDATE QTY ================= */
const updateQuantity = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;

    let cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) return res.json([]);

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const availableStock = product.sizeStock?.[size] ?? product.stock;

    if (quantity > availableStock) {
      return res.status(400).json({
        message: `Only ${availableStock} available`,
      });
    }

    const item = cart.items.find(
      (i) => i.product.toString() === productId && i.size === size,
    );

    if (item) {
      item.quantity = quantity;
    }

    await cart.save();

    const updatedCart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    res.json(updatedCart.items);
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
};

/* ================= 🔥 NEW: CLEAR CART ================= */
const clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.json([]);
    }

    cart.items = [];
    await cart.save();

    res.json([]);
  } catch (error) {
    console.log("CLEAR CART ERROR:", error);
    res.status(500).json({ message: "Clear cart failed" });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart, // ✅ EXPORT ADDED
};
