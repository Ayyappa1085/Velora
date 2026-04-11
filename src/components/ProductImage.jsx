import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState } from "react";

function ProductImage({ image, title }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="card-img">
      <img src={image} alt={title} />

      <div
        className="wishlist-icon"
        onClick={() => setLiked(!liked)}
      >
        {liked ? <FaHeart /> : <FaRegHeart />}
      </div>
    </div>
  );
}

export default ProductImage;