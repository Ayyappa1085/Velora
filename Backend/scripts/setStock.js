const mongoose = require("mongoose");
const Product = require("../models/Product");
require("dotenv").config();

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const result = await Product.updateMany(
      {},
      {
        $set: {
          "sizeStock.S": 10,
          "sizeStock.M": 10,
          "sizeStock.L": 10,
          "sizeStock.XL": 10,
        },
      },
    );

    console.log("Updated:", result.modifiedCount);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
