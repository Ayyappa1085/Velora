import { NavLink } from "react-router-dom";

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <h2 className="admin-logo">
        Velora Admin
      </h2>

      <nav>
        <NavLink to="/admin/dashboard">
          Dashboard
        </NavLink>

        <NavLink to="/admin/products">
          Products
        </NavLink>

        <NavLink to="/admin/orders">
          Orders
        </NavLink>

        <NavLink to="/admin/users">
          Users
        </NavLink>
      </nav>
    </aside>
  );
}

export default AdminSidebar;