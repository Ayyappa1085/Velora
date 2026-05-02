const Wishlist = require("../models/Wishlist");

/* ================= GET WISHLIST ================= */
const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({
      user: req.user._id,
    }).populate("products");

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: [],
      });
    }

    res.json(wishlist.products);
  } catch {
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
};

/* ================= ADD / REMOVE ================= */
const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({
      user: req.user._id,
    });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: [],
      });
    }

    const exists = wishlist.products.includes(productId);

    if (exists) {
      wishlist.products = wishlist.products.filter(
        (id) => id.toString() !== productId
      );
    } else {
      wishlist.products.push(productId);
    }

    await wishlist.save();

    res.json(wishlist.products);
  } catch {
    res.status(500).json({ message: "Wishlist update failed" });
  }
};

module.exports = {
  getWishlist,
  toggleWishlist,
};