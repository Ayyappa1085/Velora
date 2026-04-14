import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useWishlist } from "./WishlistContext";

function ProductImage({ product }) {
  const { wishlist, toggleWishlist } = useWishlist();

  const isLiked = wishlist.some(
    (item) => item.id === product.id
  );

  return (
    <div className="card-img">
      <img src={product.image} alt={product.title} />

      <div
        className="wishlist-icon"
        onClick={() => toggleWishlist(product)}
      >
        {isLiked ? <FaHeart /> : <FaRegHeart />}
      </div>
    </div>
  );
}

export default ProductImage;