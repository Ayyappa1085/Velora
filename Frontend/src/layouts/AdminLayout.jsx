import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminHeader from "../components/Admin/AdminHeader";
import "../styles/Admin.css";

function AdminLayout() {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => setOpen((prev) => !prev);

  const closeSidebar = () => setOpen(false);

  return (
    <div className="admin-shell">
      {/* Hamburger */}
      <button className="menu-btn" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Overlay */}
      {open && <div className="admin-overlay" onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <div className={`sidebar-wrap ${open ? "show" : ""}`}>
        <AdminSidebar closeSidebar={closeSidebar} />
      </div>

      {/* Main */}
      <div className="admin-main full">
        <AdminHeader />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
