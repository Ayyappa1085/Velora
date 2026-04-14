import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  // Dummy user data (replace later with backend/API)
  const user = {
    name: "Bro",
    email: "bro@gmail.com",
    mobile: "9876543210",
  };

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    pincode: "",
    city: "",
    state: "",
    address: "",
    landmark: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updated = { ...formData, [name]: value };

    // Mock pincode autofill
    if (name === "pincode") {
      if (value === "524001") {
        updated.city = "Nellore";
        updated.state = "Andhra Pradesh";
      } else if (value === "500001") {
        updated.city = "Hyderabad";
        updated.state = "Telangana";
      } else if (value.length === 6) {
        updated.city = "Your City";
        updated.state = "Your State";
      } else {
        updated.city = "";
        updated.state = "";
      }
    }

    setFormData(updated);
  };

  const handleContinue = () => {
    navigate("/order-summary", { state: formData });
  };

  return (
    <div className="checkout-page">
      <div className="checkout-card">
        <div className="checkout-left">
          <h1>Checkout</h1>
          <p className="checkout-subtitle">
            Fill your delivery details to continue
          </p>

          <div className="checkout-grid">
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Mobile Number</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter pincode"
              />
            </div>

            <div className="input-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                readOnly
              />
            </div>

            <div className="input-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                readOnly
              />
            </div>

            <div className="input-group full-width">
              <label>Address Line</label>
              <textarea
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                placeholder="House no, street, area..."
              ></textarea>
            </div>

            <div className="input-group full-width">
              <label>Landmark (Optional)</label>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                placeholder="Near temple, school..."
              />
            </div>
          </div>

          <button className="continue-btn" onClick={handleContinue}>
            Continue to Order Summary
          </button>
        </div>

        <div className="checkout-right">
          <div className="summary-box">
            <h2>Why Shop With Us?</h2>
            <ul>
              <li>✔ Premium Fashion Collection</li>
              <li>✔ Fast & Safe Delivery</li>
              <li>✔ Easy Returns</li>
              <li>✔ Secure Payment</li>
              <li>✔ Trusted Quality</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;