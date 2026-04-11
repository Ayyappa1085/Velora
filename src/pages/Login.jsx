import "../styles/Auth.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // Disable scroll
  useEffect(() => {
  document.body.style.overflow = "hidden";

  const handleEsc = (e) => {
    if (e.key === "Escape") {
      navigate(-1); // ✅ correct behavior
    }
  };

  document.addEventListener("keydown", handleEsc);

  return () => {
    document.body.style.overflow = "auto";
    document.removeEventListener("keydown", handleEsc);
  };
}, [navigate]);

  return (
    <div className="auth-overlay" onClick={() => navigate("/")}>
      <div
        className="auth-box"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Login</h2>

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button>Login</button>

        <p>
          Don't have an account?{" "}
          <span
            onClick={() =>
              navigate("/register", {
                state: location.state,
              })
            }
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;