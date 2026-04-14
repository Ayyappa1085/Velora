import "../styles/Auth.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const closeTo =
    location.state?.backgroundLocation?.pathname || "/";

  useEffect(() => {
  const scrollY = window.scrollY;

  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
  document.body.style.overflow = "hidden";

  const handleEsc = (e) => {
    if (e.key === "Escape") {
      navigate(closeTo, { replace: true });
    }
  };

  document.addEventListener("keydown", handleEsc);

  return () => {
    document.removeEventListener("keydown", handleEsc);

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";

    window.scrollTo(0, scrollY);
  };
}, [navigate, closeTo]);

  const handleLogin = () => {
  if (email === "13" && password === "13") {
    navigate("/admin/dashboard", {
      replace: true,
    });
    return;
  }

  if (email === "12" && password === "12") {
    login();
    navigate("/account/profile", {
      replace: true,
    });
    return;
  }

  setError(
    "Invalid login. Use 12/12 user or 13/13 admin"
  );
};

  return (
    <div
  className="auth-overlay"
  onClick={() => navigate(closeTo, { replace: true })}
  onWheel={(e) => e.stopPropagation()}
  onMouseWheel={(e) => e.stopPropagation()}
  onTouchMove={(e) => e.stopPropagation()}
>
      <div
        className="auth-box login-box"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Email or Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="forgot-wrap">
          <span className="forgot-link">
            Demo Login: 12 / 12
          </span>
        </div>

        {error && (
          <p
            style={{
              color: "red",
              fontSize: "14px",
              marginTop: "-6px",
            }}
          >
            {error}
          </p>
        )}

        <button onClick={handleLogin}>Login</button>

        <p>
          Don't have an account?{" "}
          <span
            onClick={() =>
              navigate("/register", {
                state: location.state,
                replace: true,
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