import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isLoggedIn, loading } = useAuth();

  // 🔥 better UX than blank screen
  if (loading) return <div>Loading...</div>;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;