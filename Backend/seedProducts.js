const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

const createItems = (
  titles,
  category,
  type,
  images,
  basePrice
) => {
  return titles.map(
    (title, index) => {
      const price =
        basePrice +
        index * 100;

      const oldPrice =
        price * 2;

      return {
        title,
        subtitle:
          "Premium Collection",
        price,
        oldPrice,
        category,
        type,
        image:
          images[index],
        stock: 10,
      };
    }
  );
};

const menShirtImages = [
  "/Men/Shirts/shirt1.webp",
  "/Men/Shirts/shirt2.webp",
  "/Men/Shirts/shirt3.webp",
  "/Men/Shirts/shirt4.webp",
  "/Men/Shirts/shirt5.webp",
  "/Men/Shirts/shirt6.webp",
  "/Men/Shirts/shirt7.webp",
  "/Men/Shirts/shirt8.webp",
];

const menJeansImages = [
  "/Men/Jeans/jeans1.webp",
  "/Men/Jeans/jeans2.webp",
  "/Men/Jeans/jeans3.webp",
  "/Men/Jeans/jeans4.webp",
  "/Men/Jeans/jeans5.webp",
  "/Men/Jeans/jeans6.webp",
  "/Men/Jeans/jeans7.webp",
  "/Men/Jeans/jeans8.webp",
];

const womenKurtaImages = [
  "/Women/Kurtas/Kurta1.webp",
  "/Women/Kurtas/Kurta2.webp",
  "/Women/Kurtas/Kurta3.webp",
  "/Women/Kurtas/Kurta4.webp",
  "/Women/Kurtas/Kurta5.webp",
  "/Women/Kurtas/Kurta6.webp",
  "/Women/Kurtas/Kurta7.webp",
  "/Women/Kurtas/Kurta8.webp",
];

const womenSareeImages = [
  "/Women/Sarees/Saree1.webp",
  "/Women/Sarees/Saree2.webp",
  "/Women/Sarees/Saree3.webp",
  "/Women/Sarees/Saree4.webp",
  "/Women/Sarees/Saree5.webp",
  "/Women/Sarees/Saree6.webp",
  "/Women/Sarees/Saree7.webp",
  "/Women/Sarees/Saree8.webp",
];

const kidsShirtImages = [
  "/Kids/Shirts/ks1.webp",
  "/Kids/Shirts/ks2.webp",
  "/Kids/Shirts/ks3.webp",
  "/Kids/Shirts/ks4.webp",
  "/Kids/Shirts/ks5.webp",
  "/Kids/Shirts/ks6.webp",
  "/Kids/Shirts/ks7.webp",
  "/Kids/Shirts/ks8.webp",
];

const kidsJeansImages = [
  "/Kids/Jeans/kj1.webp",
  "/Kids/Jeans/kj2.webp",
  "/Kids/Jeans/kj3.webp",
  "/Kids/Jeans/kj4.webp",
];

const products = [
  ...createItems(
    [
      "Black Slim Fit Shirt",
      "White Formal Shirt",
      "Premium Blue Shirt",
      "Slim Fit Shirt",
      "Checked Casual Shirt",
      "Modern Fit Shirt",
      "Classic White Shirt",
      "Trendy Street Shirt",
    ],
    "Men",
    "Shirts",
    menShirtImages,
    999
  ),

  ...createItems(
    [
      "Slim Fit Jeans",
      "Regular Fit Jeans",
      "Black Denim Jeans",
      "Ripped Jeans",
      "Loose Fit Jeans",
      "Skinny Jeans",
      "Washed Blue Jeans",
      "Cargo Jeans",
    ],
    "Men",
    "Jeans",
    menJeansImages,
    1399
  ),

  ...createItems(
    [
      "Floral Printed Kurta",
      "Anarkali Kurta",
      "Straight Fit Kurta",
      "Embroidered Kurta",
      "Cotton Kurta",
      "Silk Kurta",
      "Asymmetric Kurta",
      "Palazzo Kurta Set",
    ],
    "Women",
    "Kurtas",
    womenKurtaImages,
    899
  ),

  ...createItems(
    [
      "Silk Banarasi Saree",
      "Cotton Printed Saree",
      "Georgette Saree",
      "Kanjivaram Saree",
      "Chiffon Saree",
      "Linen Saree",
      "Designer Saree",
      "Embroidered Saree",
    ],
    "Women",
    "Sarees",
    womenSareeImages,
    1299
  ),

  ...createItems(
    [
      "Cartoon Print Shirt",
      "Striped Kids Shirt",
      "Polo Kids Shirt",
      "Graphic Tee Shirt",
      "Checked Kids Shirt",
      "Solid Cotton Shirt",
      "Denim Kids Shirt",
      "Party Kids Shirt",
    ],
    "Kids",
    "Shirts",
    kidsShirtImages,
    499
  ),

  ...createItems(
    [
      "Slim Fit Kids Jeans",
      "Regular Fit Kids Jeans",
      "Ripped Kids Jeans",
      "Black Kids Jeans",
    ],
    "Kids",
    "Pants",
    kidsJeansImages,
    699
  ),
];

const seedProducts =
  async () => {
    try {
      await mongoose.connect(
        process.env.MONGO_URI
      );

      await Product.deleteMany();

      const finalData =
        products.map(
          (item) => ({
            ...item,
            discount:
              Math.round(
                ((item.oldPrice -
                  item.price) /
                  item.oldPrice) *
                  100
              ),
          })
        );

      await Product.insertMany(
        finalData
      );

      console.log(
        "All Products Seeded Successfully"
      );

      process.exit();
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };

seedProducts();