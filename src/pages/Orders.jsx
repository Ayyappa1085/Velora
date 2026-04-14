import { useNavigate } from "react-router-dom";
import "../styles/Account.css";

function Orders() {
  const navigate = useNavigate();

  const orders = [
    {
      id: "VLR10241",
      product: "Black Oversized Shirt",
      price: "₹1499",
      status: "Delivered",
      date: "10 Apr 2026",
    },
    {
      id: "VLR10242",
      product: "Blue Denim Jeans",
      price: "₹1999",
      status: "Shipped",
      date: "11 Apr 2026",
    },
  ];

  return (
    <div className="account-page">
      <div className="account-card">
        <h2>Order History</h2>

        <div className="orders-list">
          {orders.map((item) => (
            <div className="order-card" key={item.id}>
              <h3>{item.product}</h3>
              <p>Order ID: {item.id}</p>
              <p>{item.price}</p>
              <p>Status: {item.status}</p>
              <p>{item.date}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/account/profile")}
        >
          Back to Profile
        </button>
      </div>
    </div>
  );
}

export default Orders;