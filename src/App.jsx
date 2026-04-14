import "./App.css";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Wishlist from "./pages/Wishlist";
import Homepage from "./pages/Homepage";
import CategoryLayout from "./pages/CategoryLayout";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import TrackOrder from "./pages/TrackOrder";

import Checkout from "./pages/Checkout/Checkout";
import OrderSummary from "./pages/OrderSummary/OrderSummary";
import Payment from "./pages/Payment/Payment";

import AdminDashboard from "./pages/Admin/AdminDashboard";

function App() {
  const location =
    useLocation();

  const state =
    location.state;

  const backgroundLocation =
    state?.backgroundLocation;

  const isAuthRoute =
    location.pathname ===
      "/login" ||
    location.pathname ===
      "/register";

  return (
    <>
      <Routes
        location={
          backgroundLocation &&
          isAuthRoute
            ? backgroundLocation
            : location
        }
      >
        {/* ADMIN FIRST */}
        <Route
          path="/admin"
          element={
            <AdminLayout />
          }
        >
          <Route
            path="dashboard"
            element={
              <AdminDashboard />
            }
          />
        </Route>

        {/* USER SIDE */}
        <Route
          element={
            <MainLayout />
          }
        >
          <Route
            path="/"
            element={
              <Homepage />
            }
          />

          <Route
            path="/wishlist"
            element={
              <Wishlist />
            }
          />

          <Route
            path="/account/profile"
            element={
              <Profile />
            }
          />

          <Route
            path="/account/orders"
            element={
              <Orders />
            }
          />

          <Route
            path="/account/track"
            element={
              <TrackOrder />
            }
          />

          <Route
            path="/checkout"
            element={
              <Checkout />
            }
          />

          <Route
            path="/order-summary"
            element={
              <OrderSummary />
            }
          />

          <Route
            path="/payment"
            element={
              <Payment />
            }
          />

          {/* KEEP DYNAMIC LAST */}
          <Route
            path="/:category"
            element={
              <CategoryLayout />
            }
          />

          <Route
            path="/:category/:item"
            element={
              <CategoryLayout />
            }
          />
        </Route>
      </Routes>

      {/* AUTH MODALS */}
      {isAuthRoute && (
        <Routes>
          <Route
            path="/login"
            element={
              <Login />
            }
          />

          <Route
            path="/register"
            element={
              <Register />
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;