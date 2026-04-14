import { useWishlist } from "../components/WishlistContext";
import ProductGrid from "../components/ProductGrid";
import "./Wishlist.css";

function Wishlist() {
  const { wishlist } = useWishlist();

  const isEmpty = wishlist.length === 0;

  return (
    <div className={`wishlist-page ${isEmpty ? "empty-state" : "has-items"}`}>
      <h2 className="wishlist-title">My Wishlist</h2>

      {isEmpty ? (
        <div className="wishlist-empty">
          <h3>No items in wishlist ❤️</h3>
          <p>Start adding products you like</p>
        </div>
      ) : (
        <div className="wishlist-grid">
          <ProductGrid
            products={wishlist}
            isWishlist={true}
          />
        </div>
      )}
    </div>
  );
}

export default Wishlist;