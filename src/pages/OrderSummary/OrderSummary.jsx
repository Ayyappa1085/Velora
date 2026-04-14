import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBag } from "../../BagContext";
import "./OrderSummary.css";

function OrderSummary() {
  const navigate = useNavigate();
  const location = useLocation();
  const { bag } = useBag();

  const addressData = location.state || {};
  const [shipping, setShipping] = useState("standard");

  const subtotal = bag.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const shippingCost =
    shipping === "express" ? 50 : 0;

  const total =
    subtotal + shippingCost;

  const handleContinue = () => {
    navigate("/payment", {
      state: {
        addressData,
        bagItems: bag,
        shipping,
        total,
      },
    });
  };

  if (bag.length === 0) {
    return (
      <div className="summary-page">
        <div className="empty-summary">
          <h1>Your Bag is Empty</h1>
          <p>
            Add products before checkout.
          </p>
          <button
            onClick={() =>
              navigate("/")
            }
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="summary-page">
      <div className="summary-container">
        {/* LEFT */}
        <div className="summary-products">
          <div className="section-head">
            <h1>Order Summary</h1>
            <p>
              Review your selected
              items
            </p>
          </div>

          <div className="items-wrap">
            {bag.map((item) => (
              <div
                className="summary-item"
                key={`${item.id}-${item.size}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                />

                <div className="item-details">
                  <h3>
                    {item.title}
                  </h3>

                  <div className="meta-row">
                    <span>
                      Size:{" "}
                      {item.size}
                    </span>
                    <span>
                      Qty:{" "}
                      {item.qty}
                    </span>
                  </div>

                  <div className="item-price">
                    ₹
                    {item.price *
                      item.qty}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="summary-sidebar">
          <div className="card-box">
            <h2>Deliver To</h2>

            <p>
              {addressData.name}
            </p>
            <p>
              {
                addressData.mobile
              }
            </p>
            <p>
              {
                addressData.address
              }
            </p>
            <p>
              {addressData.city},{" "}
              {
                addressData.state
              }{" "}
              -{" "}
              {
                addressData.pincode
              }
            </p>
          </div>

          <div className="card-box">
            <h2>Shipping</h2>

            <label className="ship-option">
              <input
                type="radio"
                checked={
                  shipping ===
                  "standard"
                }
                onChange={() =>
                  setShipping(
                    "standard"
                  )
                }
              />
              <span>
                Standard
              </span>
              <strong>
                Free
              </strong>
            </label>

            <label className="ship-option">
              <input
                type="radio"
                checked={
                  shipping ===
                  "express"
                }
                onChange={() =>
                  setShipping(
                    "express"
                  )
                }
              />
              <span>
                Express
              </span>
              <strong>
                +₹50
              </strong>
            </label>
          </div>

          <div className="card-box">
            <h2>Bill Details</h2>

            <div className="bill-line">
              <span>
                Subtotal
              </span>
              <span>
                ₹{subtotal}
              </span>
            </div>

            <div className="bill-line">
              <span>
                Shipping
              </span>
              <span>
                ₹
                {
                  shippingCost
                }
              </span>
            </div>

            <div className="bill-line grand-total">
              <span>Total</span>
              <span>
                ₹{total}
              </span>
            </div>

            <button
              className="pay-btn"
              onClick={
                handleContinue
              }
            >
              Continue to
              Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;