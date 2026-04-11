// 🔥 AUTO LOAD MEN SHIRTS
const shirtImages = Object.values(
  import.meta.glob("../assets/Men/Shirts/*.webp", {
    eager: true,
    import: "default"
  })
);

// 🔥 AUTO LOAD MEN JEANS
const jeansImages = Object.values(
  import.meta.glob("../assets/Men/Jeans/*.webp", {
    eager: true,
    import: "default"
  })
);



// ================= SHIRTS DATA =================
const SHIRT_DATA = [
  {
    title: "Black Slim Fit Shirt",
    subtitle: "Cotton Casual",
    price: 999,
    oldPrice: 1999,
  },
  {
    title: "White Formal Shirt",
    subtitle: "Office Wear",
    price: 1299,
    oldPrice: 2499,
  },
  {
    title: "Premium Blue Shirt",
    subtitle: "Casual Wear",
    price: 1199,
    oldPrice: 2299,
  },
  {
    title: "Slim Fit Shirt",
    subtitle: "Formal Wear",
    price: 1399,
    oldPrice: 2699,
  },
  {
    title: "Checked Casual Shirt",
    subtitle: "Daily Wear",
    price: 999,
    oldPrice: 1999,
  },
  {
    title: "Modern Fit Shirt",
    subtitle: "Stylish Look",
    price: 1299,
    oldPrice: 2499,
  },
  {
    title: "Classic White Shirt",
    subtitle: "Office Wear",
    price: 1499,
    oldPrice: 2999,
  },
  {
    title: "Trendy Street Shirt",
    subtitle: "Street Style",
    price: 1099,
    oldPrice: 2199,
  }
];


// ================= JEANS DATA =================
const JEANS_DATA = [
  {
    title: "Slim Fit Jeans",
    subtitle: "Stretch Denim",
    price: 1499,
    oldPrice: 2999,
  },
  {
    title: "Regular Fit Jeans",
    subtitle: "Classic Blue",
    price: 1399,
    oldPrice: 2799,
  },
  {
    title: "Black Denim Jeans",
    subtitle: "Street Style",
    price: 1599,
    oldPrice: 3199,
  },
  {
    title: "Ripped Jeans",
    subtitle: "Trendy Look",
    price: 1699,
    oldPrice: 3399,
  },
  {
    title: "Loose Fit Jeans",
    subtitle: "Comfort Wear",
    price: 1299,
    oldPrice: 2599,
  },
  {
    title: "Skinny Jeans",
    subtitle: "Modern Fit",
    price: 1499,
    oldPrice: 2999,
  },
  {
    title: "Washed Blue Jeans",
    subtitle: "Casual Wear",
    price: 1399,
    oldPrice: 2799,
  },
  {
    title: "Cargo Jeans",
    subtitle: "Utility Style",
    price: 1799,
    oldPrice: 3499,
  }
];



// 🔥 MERGE PRODUCTS
export const PRODUCTS = [
  ...SHIRT_DATA.map((item, index) => ({
    id: `shirt-${index + 1}`,
    category: "Men",
    type: "Shirts",
    discount: Math.round(
      ((item.oldPrice - item.price) / item.oldPrice) * 100
    ),
    ...item,
    image: shirtImages[index] || shirtImages[0]
  })),

  ...JEANS_DATA.map((item, index) => ({
    id: `jeans-${index + 1}`,
    category: "Men",
    type: "Jeans",
    discount: Math.round(
      ((item.oldPrice - item.price) / item.oldPrice) * 100
    ),
    ...item,
    image: jeansImages[index] || jeansImages[0]
  }))
];
