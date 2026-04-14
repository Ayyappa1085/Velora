import { useState } from "react";
import { PRODUCTS } from "../data/products";
import { useBag } from "../BagContext";

function Recommendations() {
  const { bag, addToBag } = useBag();
  const [openSize, setOpenSize] =
    useState(null);

  if (bag.length === 0) return null;

  const cartIds = bag.map(
    (item) => item.id
  );

  const suggested = PRODUCTS.filter(
    (p) => !cartIds.includes(p.id)
  ).slice(0, 4);

  const handleAdd = (
    product,
    size
  ) => {
    addToBag(product, size);
    setOpenSize(null);
  };

  return (
    <div className="recommend-box">
      <h4>You May Also Like</h4>

      <div className="recommend-list">
        {suggested.map((item) => (
          <div
            className="recommend-item"
            key={item.id}
          >
            <img
              src={item.image}
              alt={item.title}
            />

            <p>{item.title}</p>

            <span>₹{item.price}</span>

            <div className="recommend-action">
              <button
                className="recommend-add-btn"
                onClick={() =>
                  setOpenSize(
                    openSize ===
                      item.id
                      ? null
                      : item.id
                  )
                }
              >
                Add to Bag
              </button>

              {openSize ===
                item.id && (
                <div className="size-popup">
                  {[
                    "S",
                    "M",
                    "L",
                    "XL",
                  ].map((size) => (
                    <button
                      key={size}
                      className="popup-size-btn"
                      onClick={() =>
                        handleAdd(
                          item,
                          size
                        )
                      }
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;