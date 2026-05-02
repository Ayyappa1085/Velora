import "./ProductCard.css";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";

function ProductCard({
  product,
  isWishlist = false,
}) {
  return (
    <div className="product-card">
      <ProductImage product={product} />

      <ProductInfo
        product={product}
        isWishlist={isWishlist}
      />
    </div>
  );
}

export default ProductCard;