import {
  useEffect,
  useState,
} from "react";
import axios from "axios";
import "../../styles/AdminOrders.css";

const API =
  "http://localhost:5000/api/orders";

function AdminOrders() {
  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadOrders =
    async () => {
      try {
        const token =
          localStorage.getItem("token");

        const res =
          await axios.get(
            API,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        // 🔥 FIX SAFE DATA
        const data =
          Array.isArray(res.data)
            ? res.data
            : res.data.orders || [];

        setOrders(data);
      } catch (error) {
        console.log("Order Load Error:", error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus =
    async (
      id,
      value
    ) => {
      try {
        const token =
          localStorage.getItem("token");

        await axios.put(
          `${API}/${id}`,
          {
            status: value,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // 🔥 UPDATE UI
        setOrders((prev) =>
          prev.map((order) =>
            order._id === id
              ? {
                  ...order,
                  status: value,
                }
              : order
          )
        );
      } catch (error) {
        console.log("Update Error:", error);
      }
    };

  const formatDateTime = (
    date
  ) => {
    return new Date(
      date
    ).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  if (loading) {
    return (
      <div className="orders-page">
        <h2>
          Loading Orders...
        </h2>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-topbar">
        <h2>
          Order Management
        </h2>

        <span>
          {orders.length} Orders
        </span>
      </div>

      {orders.length ===
      0 ? (
        <div className="empty-products">
          No Orders Found
        </div>
      ) : (
        <>
          <div className="orders-table-wrap">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>
                    Customer
                  </th>
                  <th>
                    Items
                  </th>
                  <th>
                    Total
                  </th>
                  <th>
                    Payment
                  </th>
                  <th>
                    Date / Time
                  </th>
                  <th>
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map(
                  (
                    order
                  ) => (
                    <tr
                      key={
                        order._id
                      }
                    >
                      <td>
                        {order.orderId ||
                          order._id}
                      </td>

                      <td>
                        <strong>
                          {
                            order.customerName
                          }
                        </strong>
                        <br />

                        <small>
                          {
                            order.phone
                          }
                        </small>
                      </td>

                      <td>
                        {order.items
                          ?.length || 0}
                      </td>

                      <td>
                        ₹
                        {Math.round(
                          order.totalAmount || 0
                        )}
                      </td>

                      <td>
                        {
                          order.paymentMethod
                        }
                      </td>

                      <td>
                        {formatDateTime(
                          order.createdAt
                        )}
                      </td>

                      <td>
                        <select
                          value={
                            order.status
                          }
                          onChange={(
                            e
                          ) =>
                            updateStatus(
                              order._id,
                              e.target.value
                            )
                          }
                          className={`status-select ${order.status?.toLowerCase()}`}
                        >
                          <option>
                            Placed
                          </option>

                          <option>
                            Confirmed
                          </option>

                          <option>
                            Shipped
                          </option>

                          <option>
                            Delivered
                          </option>

                          <option>
                            Cancelled
                          </option>
                        </select>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          <div className="mobile-orders">
            {orders.map(
              (
                order
              ) => (
                <div
                  className="order-card"
                  key={
                    order._id
                  }
                >
                  <div className="card-head">
                    <h3>
                      {order.orderId ||
                        order._id}
                    </h3>

                    <span>
                      {formatDateTime(
                        order.createdAt
                      )}
                    </span>
                  </div>

                  <p>
                    {order.customerName} •{" "}
                    {order.phone}
                  </p>

                  <p>
                    Items:{" "}
                    {order.items
                      ?.length || 0}
                  </p>

                  <p>
                    Total: ₹
                    {Math.round(
                      order.totalAmount || 0
                    )}
                  </p>

                  <p>
                    Payment:{" "}
                    {
                      order.paymentMethod
                    }
                  </p>

                  <select
                    value={
                      order.status
                    }
                    onChange={(
                      e
                    ) =>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }
                    className={`status-select ${order.status?.toLowerCase()}`}
                  >
                    <option>
                      Placed
                    </option>

                    <option>
                      Confirmed
                    </option>

                    <option>
                      Shipped
                    </option>

                    <option>
                      Delivered
                    </option>

                    <option>
                      Cancelled
                    </option>
                  </select>
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default AdminOrders;