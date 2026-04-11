import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import Homepage from "./pages/Homepage";
import CategoryLayout from "./pages/CategoryLayout";
import MainLayout from "./layouts/MainLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const location = useLocation();

  const state = location.state;
  const backgroundLocation = state?.backgroundLocation;

  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <MainLayout>

      {/* 🔥 MAIN ROUTES */}
      <Routes
        location={
          backgroundLocation && isAuthRoute
            ? backgroundLocation
            : location
        }
      >
        <Route path="/" element={<Homepage />} />
        <Route path="/:category" element={<CategoryLayout />} />
        <Route path="/:category/:item" element={<CategoryLayout />} />
      </Routes>

      {/* 🔥 AUTH ROUTES (ONLY WHEN NEEDED) */}
      {isAuthRoute && (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}

    </MainLayout>
  );
}

export default App;