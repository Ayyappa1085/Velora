import { useState } from "react";
import { useBag } from "../BagContext";

function CouponBox() {
  const { coupon, applyCoupon } = useBag();

  const [code, setCode] = useState("");

  const [message, setMessage] = useState("");

  const coupons = {
    SAVE10: 10,
    SAVE20: 20,
    WELCOME15: 15,
  };

  const handleApply = () => {
    const clean = code.trim().toUpperCase();

    if (!clean) {
      setMessage("Enter coupon code");
      return;
    }

    if (coupons[clean]) {
      applyCoupon(clean);

      // 🔥 FIX: only show success after applying
      setMessage(`${coupons[clean]}% discount applied`);
    } else {
      setMessage("Invalid coupon code");
    }

    setCode("");
  };

  const removeCoupon = () => {
    // 🔥 FIX: reset properly
    applyCoupon(null);

    setMessage("Coupon removed");
  };

  return (
    <div className="coupon-box">
      <h4>Apply Coupon</h4>

      {coupon?.code ? (
        <div className="coupon-applied">
          <span>
            {coupon.code} ({coupon.discount}% OFF)
          </span>

          <button type="button" onClick={removeCoupon}>
            ✕
          </button>
        </div>
      ) : (
        <div className="coupon-row">
          <input
            type="text"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleApply();
              }
            }}
          />

          <button type="button" onClick={handleApply}>
            Apply
          </button>
        </div>
      )}

      {message && <p className="coupon-msg">{message}</p>}
    </div>
  );
}

export default CouponBox;
