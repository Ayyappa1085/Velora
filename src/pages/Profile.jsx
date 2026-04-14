import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Account.css";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  

  return (
    <div className="account-page">
      <div className="account-card">
        <div className="profile-top">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="Profile"
            className="profile-img"
          />

          <div>
            <h2>{user.name}</h2>
            <p className="joined-text">
              Member since {user.joined}
            </p>
          </div>
        </div>

        <div className="profile-info">
          <div className="info-box">
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>

          <div className="info-box">
            <span>Phone</span>
            <strong>{user.phone}</strong>
          </div>
        </div>

        <div className="account-actions">
          <button
            onClick={() => navigate("/account/orders")}
          >
            Order History
          </button>

          <button
            onClick={() => navigate("/account/track")}
          >
            Track Order
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