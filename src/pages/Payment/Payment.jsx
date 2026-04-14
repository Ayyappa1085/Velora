import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state || {};

  return (
    <div className="payment-page">
      <div className="payment-card">
        <div className="payment-icon">💳</div>

        <h1>Payment Gateway</h1>
        <p className="payment-subtitle">
          This page is currently under construction.
        </p>

        <div className="payment-box">
          <div className="payment-row">
            <span>Order Total</span>
            <strong>₹{data.total || 0}</strong>
          </div>

          <div className="payment-row">
            <span>Status</span>
            <strong className="status-text">Coming Soon</strong>
          </div>

          <div className="payment-row">
            <span>Next Phase</span>
            <strong>Razorpay / Stripe</strong>
          </div>
        </div>

        <div className="payment-actions">
          <button onClick={() => navigate("/order-summary")}>
            Back to Summary
          </button>

          <button
            className="home-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;