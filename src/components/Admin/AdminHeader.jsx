import { useNavigate } from "react-router-dom";

function AdminHeader() {
  const navigate = useNavigate();

  return (
    <div className="admin-header">
      <h1>Dashboard</h1>

      <button
        onClick={() => navigate("/")}
      >
        Logout
      </button>
    </div>
  );
}

export default AdminHeader;