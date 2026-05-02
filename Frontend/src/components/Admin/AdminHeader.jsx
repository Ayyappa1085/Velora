import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext"; // 🔥 ADD THIS

function AdminHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth(); // 🔥 USE REAL LOGOUT

  const titles = {
    "/admin/dashboard": "Dashboard",
    "/admin/products": "Products",
    "/admin/orders": "Orders",
    "/admin/revenue": "Revenue",
    "/admin/stock": "Stock",
    "/admin/cancelled": "Cancelled",
  };

  const pageTitle = titles[location.pathname] || "Admin";

  const handleLogout = () => {
    logout(); // 🔥 THIS DOES EVERYTHING
  };

  return (
    <div className="admin-header">
      <h1>{pageTitle}</h1>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminHeader;
