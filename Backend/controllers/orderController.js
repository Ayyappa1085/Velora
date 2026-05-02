const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");

/* ================= GENERATE ORDER ID ================= */
const generateOrderId = () => {
  const num = Math.floor(
    1000000000 + Math.random() * 9000000000
  );
  return `VLR${num}`;
};

/* ================= CREATE ORDER (FULL SAFE) ================= */
const createOrder = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const { items = [], idempotencyKey } = req.body;

      if (!items.length) {
        throw new Error("No items in order");
      }

      if (idempotencyKey) {
        const existing = await Order.findOne({
          idempotencyKey,
        }).session(session);

        if (existing) {
          return res.status(200).json(existing);
        }
      }

      let orderId = generateOrderId();

      let exists = await Order.findOne({ orderId }).session(session);
      while (exists) {
        orderId = generateOrderId();
        exists = await Order.findOne({ orderId }).session(session);
      }

      /* ================= STOCK CONTROL ================= */
      for (const item of items) {
        const productId =
          item.productId || item.product;

        const qty =
          item.qty || item.quantity;

        const product = await Product.findById(productId).session(session);

        if (!product) {
          throw new Error("Product not found");
        }

        const size = item.size;

        if (!["S", "M", "L", "XL"].includes(size)) {
          throw new Error("Invalid size");
        }

        const result = await Product.updateOne(
          {
            _id: product._id,
            [`sizeStock.${size}`]: { $gte: qty },
          },
          {
            $inc: {
              [`sizeStock.${size}`]: -qty,
            },
          },
          { session }
        );

        if (result.modifiedCount === 0) {
          throw new Error(`${product.title} (${size}) sold out`);
        }
      }

      /* ================= NORMALIZE ITEMS ================= */
      const normalizedItems = items.map((item) => ({
        title: item.title,
        price: item.price,
        qty: item.qty || item.quantity,
        size: item.size,
        image: item.image || "",
      }));

      /* ================= CREATE ORDER ================= */
      const order = await Order.create(
        [
          {
            ...req.body,
            items: normalizedItems,
            orderId,
            user: req.user.id,
            idempotencyKey: idempotencyKey || undefined,
          },
        ],
        { session }
      );

      res.status(201).json(order[0]);
    });

  } catch (error) {
    console.log("ORDER ERROR:", error.message);

    res.status(400).json({
      message: error.message || "Order failed",
    });
  } finally {
    session.endSession();
  }
};

/* ================= GET ORDERS ================= */
const getOrders = async (req, res) => {
  try {
    let orders;

    if (req.user.role === "admin") {
      orders = await Order.find().sort({ createdAt: -1 });
    } else {
      orders = await Order.find({
        user: req.user.id,
      }).sort({ createdAt: -1 });
    }

    res.status(200).json(orders);
  } catch {
    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};

/* ================= GET SINGLE ORDER ================= */
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (
      order.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    res.status(200).json(order);
  } catch {
    res.status(500).json({
      message: "Failed to fetch order",
    });
  }
};

/* ================= UPDATE ORDER STATUS (FIXED) ================= */
const updateOrderStatus = async (req, res) => {
  try {
    let { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    // ✅ Normalize (important)
    status =
      status.charAt(0).toUpperCase() +
      status.slice(1).toLowerCase();

    const allowed = [
      "Placed",
      "Confirmed",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.log("STATUS UPDATE ERROR:", error);
    res.status(500).json({
      message: "Failed to update status",
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
};