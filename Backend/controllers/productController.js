const Product = require("../models/Product");

/* ================= GET PRODUCTS ================= */
const getProducts = async (req, res) => {
  try {
    const { category, type, search, page = 1, limit = 12 } = req.query;

    let query = {};

    if (category) {
      query.category = { $regex: `^${category}$`, $options: "i" };
    }

    if (type) {
      query.type = { $regex: `^${type}$`, $options: "i" };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { subtitle: { $regex: search, $options: "i" } },
      ];
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const totalProducts = await Product.countDocuments(query);

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      products,
      currentPage: pageNum,
      totalPages: Math.ceil(totalProducts / limitNum),
      totalProducts,
    });
  } catch {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

/* ================= GET SINGLE PRODUCT ================= */
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch {
    res.status(500).json({
      message: "Failed to fetch product",
    });
  }
};

/* ================= ADD PRODUCT ================= */
const addProduct = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      price,
      oldPrice,
      category,
      type,
      stock = 0,
    } = req.body;

    const product = await Product.create({
      title,
      subtitle,
      price,
      oldPrice,
      category,
      type,
      stock,
      image: req.file ? req.file.path : "",
      sizeStock: {
        S: stock,
        M: stock,
        L: stock,
        XL: stock,
      },
    });

    res.status(201).json(product);
  } catch {
    res.status(500).json({ message: "Failed to add product" });
  }
};

/* ================= UPDATE PRODUCT (FIXED) ================= */
const updateProduct = async (req, res) => {
  try {
    const { stock, ...rest } = req.body;

    let updateData = { ...rest };

    // 🔥 CRITICAL FIX
    if (stock !== undefined) {
      const parsedStock = Number(stock);

      updateData.stock = parsedStock;

      updateData.sizeStock = {
        S: parsedStock,
        M: parsedStock,
        L: parsedStock,
        XL: parsedStock,
      };
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.status(200).json(updated);
  } catch {
    res.status(500).json({ message: "Failed to update product" });
  }
};

/* ================= DELETE PRODUCT ================= */
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete product" });
  }
};

/* ================= UPDATE SIZE STOCK ================= */
const updateStock = async (req, res) => {
  try {
    const { sizeStock } = req.body;

    if (!sizeStock || typeof sizeStock !== "object") {
      return res.status(400).json({
        message: "sizeStock required",
      });
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { sizeStock },
      { new: true },
    );

    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Stock update failed",
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  updateStock,
};
