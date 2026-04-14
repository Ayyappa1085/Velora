import { useState } from "react";

function CouponBox({
  coupon,
  setCoupon,
}) {
  const [code, setCode] =
    useState("");

  const coupons = {
    SAVE10: 10,
    SAVE20: 20,
    WELCOME15: 15,
  };

  const applyCoupon = () => {
    const clean =
      code.trim().toUpperCase();

    if (!clean) return;

    if (coupons[clean]) {
      setCoupon({
        code: clean,
        discount:
          coupons[clean],
        message:
          "Coupon Applied",
      });
    } else {
      setCoupon({
        code: "",
        discount: 0,
        message:
          "Invalid Coupon",
      });
    }

    setCode("");
  };

  const removeCoupon = () => {
    setCoupon({
      code: "",
      discount: 0,
      message: "",
    });
  };

  return (
    <div className="coupon-box">
      <h4>Apply Coupon</h4>

      {coupon.code ? (
        <div className="coupon-applied">
          <span>
            {coupon.code} (
            {coupon.discount}% OFF)
          </span>

          <button
            onClick={
              removeCoupon
            }
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="coupon-row">
          <input
            type="text"
            placeholder="Enter code"
            value={code}
            onChange={(e) =>
              setCode(
                e.target.value
              )
            }
          />

          <button
            onClick={
              applyCoupon
            }
          >
            Apply
          </button>
        </div>
      )}

      {coupon.message && (
        <p className="coupon-msg">
          {coupon.message}
        </p>
      )}
    </div>
  );
}

export default CouponBox;