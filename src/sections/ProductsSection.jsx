import ProductGrid from "../components/ProductGrid";

function ProductsSection({ products = [] }) {
  if (!products) return null;

  return (
    <div className="products-container">
      {products.length === 0 ? (
        <div className="empty-state">
          <h2>No Products Found</h2>
          <p>Try exploring other categories</p>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}

export default ProductsSection;