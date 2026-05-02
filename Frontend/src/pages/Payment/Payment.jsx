import { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { useBag } from "../../BagContext";
import toast from "react-hot-toast"; // ✅ added
import "./Payment.css";

const API = "/api/orders";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearBag } = useBag();

  const data = location.state || {};

  const [loading, setLoading] =
    useState(false);

  const handlePlaceOrder = async () => {
    try {
      if (!data?.bagItems?.length) {
        toast.error("Your bag is empty"); // ✅ replaced
        return;
      }

      if (!data?.addressData?.name) {
        toast.error("Address missing"); // ✅ replaced
        return;
      }

      setLoading(true);

      const token = localStorage.getItem("token");

      const idempotencyKey =
        (window.crypto &&
          crypto.randomUUID &&
          crypto.randomUUID()) ||
        Date.now().toString();

      const formattedItems =
        data.bagItems.map((item) => {
          let productId = null;

          if (item.product && item.product._id) {
            productId = item.product._id;
          } else if (
            typeof item.product === "string"
          ) {
            productId = item.product;
          } else if (item._id) {
            productId = item._id;
          }

          if (!productId) {
            console.error(
              "Invalid product item:",
              item
            );
            throw new Error(
              "Invalid product in cart"
            );
          }

          return {
            product: productId,
            title:
              item.product?.title || "",
            price:
              item.product?.price || 0,
            image:
              item.product?.image ||
              item.product?.images?.[0] ||
              "",
            quantity: item.quantity,
            size: item.size,
          };
        });

      const payload = {
        customerName:
          data.addressData?.name ||
          "Guest",

        phone:
          data.addressData?.mobile ||
          "",

        address: [
          data.addressData?.address,
          data.addressData?.city,
          data.addressData?.state,
          data.addressData?.pincode,
        ]
          .filter(Boolean)
          .join(", "),

        paymentMethod: "COD",
        status: "Placed",

        totalAmount:
          data.total || 0,

        items: formattedItems,

        idempotencyKey,
      };

      console.log(
        "ORDER PAYLOAD:",
        payload
      );

      await axios.post(API, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      clearBag();

      toast.success("Order placed successfully"); // ✅ replaced

      navigate("/account/orders");
    } catch (error) {
      console.log(
        "ORDER ERROR:",
        error
      );

      toast.error( // ✅ replaced
        error?.response?.data?.message ||
          error.message ||
          "Order failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        <div className="payment-icon">
          💳
        </div>

        <h1>Payment Gateway</h1>

        <p className="payment-subtitle">
          Payment integration will be added in next phase.
        </p>

        <div className="payment-box">
          <div className="payment-row">
            <span>Order Total</span>
            <strong>
              ₹{data.total || 0}
            </strong>
          </div>

          <div className="payment-row">
            <span>Payment Mode</span>
            <strong>
              Cash On Delivery
            </strong>
          </div>

          <div className="payment-row">
            <span>Next Upgrade</span>
            <strong>
              Razorpay / Stripe
            </strong>
          </div>
        </div>

        <div className="payment-actions">
          <button
            onClick={() =>
              navigate("/order-summary")
            }
            disabled={loading}
          >
            Back to Summary
          </button>

          <button
            className="home-btn"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading
              ? "Placing..."
              : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;