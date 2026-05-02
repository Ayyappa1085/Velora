import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // 🔥 Prevent crash if user not loaded yet
  if (!user) {
    return <div className="profile-page">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">

        {/* LEFT - PROFILE CARD */}
        <div className="profile-card">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="Profile"
            className="profile-img"
          />

          <h2>{user.name}</h2>

          {/* ✅ REAL DATE */}
          <p className="joined">
            Member since{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>

          <div className="profile-details">
            <div>
              <span>Email</span>
              <strong>{user.email}</strong>
            </div>

            {/* ✅ OPTIONAL FIELD */}
            <div>
              <span>Phone</span>
              <strong>
                {user.phone || "Not provided"}
              </strong>
            </div>
          </div>
        </div>

        {/* RIGHT - ACTIONS */}
        <div className="profile-actions">
          <h3>My Account</h3>

          <button onClick={() => navigate("/account/orders")}>
            🧾 Order History
          </button>

          <button onClick={() => navigate("/account/track")}>
            🚚 Track Order
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default Profile;