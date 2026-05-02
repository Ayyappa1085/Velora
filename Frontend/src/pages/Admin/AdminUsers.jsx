import { useState } from "react";
import "../../styles/AdminUsers.css";

function AdminUsers() {
  const [search, setSearch] = useState("");

  const users = [
    { id: 1, name: "Rahul", email: "rahul@gmail.com", phone: "9876543210", orders: 4, joined: "12 Apr 2026", status: "Active" },
    { id: 2, name: "Priya", email: "priya@gmail.com", phone: "9123456780", orders: 2, joined: "10 Apr 2026", status: "Active" },
    { id: 3, name: "Arjun", email: "arjun@gmail.com", phone: "9988776655", orders: 1, joined: "08 Apr 2026", status: "Blocked" },
    { id: 4, name: "Sneha", email: "sneha@gmail.com", phone: "9000001111", orders: 6, joined: "01 Apr 2026", status: "Active" },
  ];

  const filtered = users.filter((u) => `${u.name}${u.email}${u.phone}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="users-page">
      <div className="users-topbar">
        <div><h2>User Management</h2><p>Manage customer accounts</p></div>
        <input type="text" placeholder="Search user..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/* Desktop Table */}
      <div className="users-table-wrap">
        <table className="users-table">
          <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Orders</th><th>Joined</th><th>Status</th></tr></thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td><td>{u.email}</td><td>{u.phone}</td><td>{u.orders}</td><td>{u.joined}</td>
                <td><span className={`user-badge ${u.status.toLowerCase()}`}>{u.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="mobile-users">
        {filtered.map((u) => (
          <div className="user-card" key={u.id}>
            <div className="user-head"><h3>{u.name}</h3><span className={`user-badge ${u.status.toLowerCase()}`}>{u.status}</span></div>
            <p>{u.email}</p><p>{u.phone}</p>
            <div className="user-meta"><span>Orders: {u.orders}</span><span>{u.joined}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminUsers;