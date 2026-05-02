import {
  useEffect,
  useState,
} from "react";
import axios from "axios";

function AdminCancelled() {
  const [orders, setOrders] =
    useState([]);
  const [loading, setLoading] =
    useState(true);

  const getToken = () =>
    localStorage.getItem("token");

  useEffect(() => {
    const loadOrders =
      async () => {
        try {
          const token =
            getToken();

          const res =
            await axios.get(
              "http://localhost:5000/api/orders",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          // 🔥 FIX SAFE DATA
          const data =
            Array.isArray(
              res.data
            )
              ? res.data
              : res.data.orders || [];

          setOrders(data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    loadOrders();
  }, []);

  const cancelled =
    orders.filter(
      (item) =>
        item.status ===
          "Cancelled" ||
        item.status ===
          "Failed"
    );

  if (loading) {
    return (
      <div className="admin-panel-box">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="admin-panel-box">
      <h2>
        Failed / Cancelled Orders
      </h2>

      {cancelled.length ===
      0 ? (
        <p>
          No cancelled
          orders found.
        </p>
      ) : (
        <div className="cancelled-list">
          {cancelled.map(
            (item) => (
              <div
                className="cancel-card"
                key={
                  item._id
                }
              >
                <div>
                  <h4>
                    {
                      item.customerName
                    }
                  </h4>

                  <p>
                    {
                      item.phone
                    }
                  </p>

                  <small>
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </small>
                </div>

                <div className="cancel-right">
                  <span className="cancel-badge">
                    {
                      item.status
                    }
                  </span>

                  <strong>
                    ₹
                    {Math.round(
                      item.totalAmount || 0
                    )}
                  </strong>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default AdminCancelled;