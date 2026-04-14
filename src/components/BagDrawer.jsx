import "./BagDrawer.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTimes,
  FaMinus,
  FaPlus,
  FaHeart,
} from "react-icons/fa";

import { useBag } from "../BagContext";
import { useWishlist } from "./WishlistContext";

import CouponBox from "./CouponBox";
import Recommendations from "./Recommendations";
import PriceSummary from "./PriceSummary";

function BagDrawer() {
  const navigate = useNavigate();

  const {
    bag,
    saved,
    isBagOpen,
    toast,
    closeBag,
    increaseQty,
    decreaseQty,
    removeFromBag,
    saveForLater,
    moveToBag,
    removeSaved,
    totalItems,
    totalPrice,
  } = useBag();

  const {
    wishlist,
    toggleWishlist,
  } = useWishlist();

  const [coupon, setCoupon] =
    useState({
      code: "",
      discount: 0,
      message: "",
    });

  useEffect(() => {
    document.body.style.overflow =
      isBagOpen ? "hidden" : "auto";

    document.documentElement.style.overflow =
      isBagOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow =
        "auto";
      document.documentElement.style.overflow =
        "auto";
    };
  }, [isBagOpen]);

  const discountAmount =
    (totalPrice *
      coupon.discount) /
    100;

  const finalTotal =
    totalPrice -
    discountAmount;

  const handleMoveToWishlist = (
    item
  ) => {
    const alreadyExists =
      wishlist.some(
        (w) =>
          w.id === item.id
      );

    if (!alreadyExists) {
      toggleWishlist(item);
    }

    removeFromBag(item.id);
  };

  const handleCheckout = () => {
    closeBag();
    navigate("/checkout");
  };

  return (
    <>
      {toast && (
        <div className="bag-toast">
          {toast}
        </div>
      )}

      <div
        className={`bag-overlay ${
          isBagOpen
            ? "show"
            : ""
        }`}
        onClick={closeBag}
      />

      <div
        className={`bag-drawer ${
          isBagOpen
            ? "open"
            : ""
        }`}
      >
        {/* Header */}
        <div className="bag-header">
          <button
            onClick={closeBag}
          >
            <FaTimes />
          </button>

          <h3>
            BAG ({totalItems})
          </h3>
        </div>

        {/* Content */}
        <div className="bag-content">
          {bag.length === 0 ? (
            <div className="empty-wrap">
              <h3>
                Your bag is empty
              </h3>

              <p>
                Add something
                you love.
              </p>

              <button
                onClick={
                  closeBag
                }
              >
                Continue
                Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Items */}
              {bag.map(
                (item) => (
                  <div
                    className="bag-item"
                    key={`${item.id}-${item.size}`}
                  >
                    <img
                      src={
                        item.image
                      }
                      alt={
                        item.title
                      }
                    />

                    <div className="bag-info">
                      <h4>
                        {
                          item.title
                        }
                      </h4>

                      <p className="bag-price">
                        ₹
                        {
                          item.price
                        }
                      </p>

                      {item.size && (
                        <div className="bag-size-pill">
                          Size{" "}
                          {
                            item.size
                          }
                        </div>
                      )}

                      <div className="qty-box">
                        <button
                          onClick={() =>
                            decreaseQty(
                              item.id
                            )
                          }
                        >
                          <FaMinus />
                        </button>

                        <span>
                          {
                            item.qty
                          }
                        </span>

                        <button
                          onClick={() =>
                            increaseQty(
                              item.id
                            )
                          }
                        >
                          <FaPlus />
                        </button>
                      </div>

                      <button
                        className="save-btn"
                        onClick={() =>
                          saveForLater(
                            item.id
                          )
                        }
                      >
                        Save for
                        Later
                      </button>
                    </div>

                    {/* Right Actions */}
                    <div className="bag-actions">
                      <button
                        className="wish-btn active"
                        onClick={() =>
                          handleMoveToWishlist(
                            item
                          )
                        }
                        title="Move to Wishlist"
                      >
                        <FaHeart />
                      </button>

                      <button
                        className="remove-btn"
                        onClick={() =>
                          removeFromBag(
                            item.id
                          )
                        }
                        title="Remove"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                )
              )}

              <CouponBox
                coupon={
                  coupon
                }
                setCoupon={
                  setCoupon
                }
              />

              <PriceSummary
                totalPrice={
                  totalPrice
                }
                discountPercent={
                  coupon.discount
                }
              />

              <Recommendations />

              {/* Saved */}
              {saved.length >
                0 && (
                <div className="saved-box">
                  <h4>
                    Saved for
                    Later
                  </h4>

                  {saved.map(
                    (
                      item
                    ) => (
                      <div
                        className="saved-item"
                        key={`${item.id}-${item.size}`}
                      >
                        <img
                          src={
                            item.image
                          }
                          alt={
                            item.title
                          }
                        />

                        <div className="saved-info">
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

                          {item.size && (
                            <div className="bag-size-pill">
                              Size{" "}
                              {
                                item.size
                              }
                            </div>
                          )}

                          <div className="saved-actions">
                            <button
                              onClick={() =>
                                moveToBag(
                                  item.id
                                )
                              }
                            >
                              Move
                              to
                              Bag
                            </button>

                            <button
                              onClick={() =>
                                removeSaved(
                                  item.id
                                )
                              }
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {bag.length > 0 && (
          <div className="bag-footer">
            <button
              className="checkout-btn"
              onClick={
                handleCheckout
              }
            >
              CHECKOUT /
              ₹{" "}
              {
                finalTotal
              }
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default BagDrawer;