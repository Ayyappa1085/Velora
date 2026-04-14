import ProductCard from "./ProductCard";

function ProductGrid({
  products,
  isWishlist = false,
}) {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isWishlist={isWishlist}
        />
      ))}
    </div>
  );
}

export default ProductGrid;