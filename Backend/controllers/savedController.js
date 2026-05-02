const Saved = require("../models/Saved");

/* ================= GET SAVED ================= */
const getSaved = async (req, res) => {
  try {
    let saved = await Saved.findOne({
      user: req.user._id,
    }).populate("items.product");

    if (!saved) {
      saved = await Saved.create({
        user: req.user._id,
        items: [],
      });
    }

    res.json(saved.items);
  } catch {
    res.status(500).json({ message: "Failed to fetch saved items" });
  }
};

/* ================= ADD TO SAVED ================= */
const addToSaved = async (req, res) => {
  try {
    const { productId, size } = req.body;

    let saved = await Saved.findOne({
      user: req.user._id,
    });

    if (!saved) {
      saved = await Saved.create({
        user: req.user._id,
        items: [],
      });
    }

    const exists = saved.items.some(
      (item) =>
        item.product.toString() === productId &&
        item.size === size
    );

    if (!exists) {
      saved.items.push({
        product: productId,
        size,
      });
    }

    await saved.save();

    const updated = await Saved.findOne({
      user: req.user._id,
    }).populate("items.product");

    res.json(updated.items);
  } catch {
    res.status(500).json({ message: "Add to saved failed" });
  }
};

/* ================= REMOVE FROM SAVED ================= */
const removeFromSaved = async (req, res) => {
  try {
    const { productId, size } = req.body;

    let saved = await Saved.findOne({
      user: req.user._id,
    });

    if (!saved) return res.json([]);

    saved.items = saved.items.filter(
      (item) =>
        !(
          item.product.toString() === productId &&
          item.size === size
        )
    );

    await saved.save();

    const updated = await Saved.findOne({
      user: req.user._id,
    }).populate("items.product");

    res.json(updated.items);
  } catch {
    res.status(500).json({ message: "Remove failed" });
  }
};

module.exports = {
  getSaved,
  addToSaved,
  removeFromSaved,
};