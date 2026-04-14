function AdminDashboard() {
  const cards = [
    {
      title: "Products",
      value: 24,
    },
    {
      title: "Orders",
      value: 18,
    },
    {
      title: "Users",
      value: 42,
    },
    {
      title: "Revenue",
      value: "₹12,540",
    },
  ];

  return (
    <div>
      <div className="stats-grid">
        {cards.map((card) => (
          <div
            className="stat-card"
            key={card.title}
          >
            <p>{card.title}</p>
            <h2>{card.value}</h2>
          </div>
        ))}
      </div>

      <div className="admin-panel-box">
        Phase 1 admin panel ready.
      </div>
    </div>
  );
}

export default AdminDashboard;