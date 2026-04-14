import { useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { useBag } from "../BagContext";
import { useWishlist } from "./WishlistContext";

function ProductInfo({
  product,
  isWishlist = false,
}) {
  const { addToBag } = useBag();
  const { toggleWishlist } =
    useWishlist();

  const [showSizes, setShowSizes] =
    useState(false);

  const sizes = ["S", "M", "L", "XL"];

  const handleSelectSize = (size) => {
    addToBag(product, size);
    setShowSizes(false);

    if (isWishlist) {
      toggleWishlist(product);
    }
  };

  return (
    <div className="card-info">
      <div className="title-row">
        <h4>{product.title}</h4>

        <span
          className="plus-icon"
          onClick={() =>
            setShowSizes(!showSizes)
          }
        >
          <FaShoppingBag />
        </span>
      </div>

      <p className="subtitle">
        {product.subtitle}
      </p>

      <div className="price">
        <span className="new">
          ₹{product.price}
        </span>

        <span className="old">
          ₹{product.oldPrice}
        </span>
      </div>

      {showSizes && (
        <div className="size-picker">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() =>
                handleSelectSize(size)
              }
            >
              {size}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductInfo;