import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Account.css";

function TrackOrder() {
  const navigate = useNavigate();

  const [trackingId, setTrackingId] = useState("");
  const [result, setResult] = useState("");

  const handleTrack = () => {
    if (trackingId === "TRK92811") {
      setResult("Out for Delivery");
    } else if (trackingId === "TRK92812") {
      setResult("Shipped");
    } else {
      setResult("Tracking ID not found");
    }
  };

  return (
    <div className="account-page">
      <div className="account-card">
        <h2>Track Order</h2>

        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) =>
            setTrackingId(e.target.value)
          }
          className="track-input"
        />

        <button onClick={handleTrack}>
          Search
        </button>

        {result && (
          <div className="track-result">
            {result}
          </div>
        )}

        <p className="demo-track">
          Demo IDs: TRK92811 / TRK92812
        </p>

        <button
          onClick={() => navigate("/account/profile")}
        >
          Back to Profile
        </button>
      </div>
    </div>
  );
}

export default TrackOrder;