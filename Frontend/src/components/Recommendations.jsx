import {
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useBag } from "../BagContext";

const API =
  "http://localhost:5000/api/products";

function Recommendations() {
  const { bag, addToBag } =
    useBag();

  const [products, setProducts] =
    useState([]);

  const [openSize, setOpenSize] =
    useState(null);

  useEffect(() => {
    const loadProducts =
      async () => {
        try {
          const res =
            await axios.get(API);

          const data =
            Array.isArray(
              res.data
            )
              ? res.data
              : Array.isArray(
                  res.data.products
                )
              ? res.data.products
              : [];

          setProducts(data);
        } catch (error) {
          console.log(error);
          setProducts([]);
        }
      };

    loadProducts();
  }, []);

  if (bag.length === 0)
    return null;

  const cartIds = bag.map(
    (item) =>
      item._id || item.id
  );

  const suggested =
    products
      .filter(
        (item) =>
          !cartIds.includes(
            item._id || item.id
          )
      )
      .slice(0, 4);

  const handleAdd = (
    product,
    size
  ) => {
    addToBag(product, size);
    setOpenSize(null);
  };

  if (suggested.length === 0)
    return null;

  return (
    <div className="recommend-box">
      <h4>
        You May Also Like
      </h4>

      <div className="recommend-list">
        {suggested.map(
          (item) => {
            const itemId =
              item._id ||
              item.id;

            return (
              <div
                className="recommend-item"
                key={itemId}
              >
                <img
                  src={
                    item.image
                  }
                  alt={
                    item.title
                  }
                />

                <p>
                  {
                    item.title
                  }
                </p>

                <span>
                  ₹
                  {
                    item.price
                  }
                </span>

                <div className="recommend-action">
                  <button
                    className="recommend-add-btn"
                    onClick={() =>
                      setOpenSize(
                        openSize ===
                          itemId
                          ? null
                          : itemId
                      )
                    }
                  >
                    Add to Bag
                  </button>

                  {openSize ===
                    itemId && (
                    <div className="size-popup">
                      {[
                        "S",
                        "M",
                        "L",
                        "XL",
                      ].map(
                        (
                          size
                        ) => (
                          <button
                            key={
                              size
                            }
                            className="popup-size-btn"
                            onClick={() =>
                              handleAdd(
                                item,
                                size
                              )
                            }
                          >
                            {
                              size
                            }
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default Recommendations;