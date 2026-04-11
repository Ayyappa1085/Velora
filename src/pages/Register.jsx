import "../styles/Auth.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  // Disable scroll
  useEffect(() => {
  document.body.style.overflow = "hidden";

  const handleEsc = (e) => {
    if (e.key === "Escape") {
      navigate(-1);
    }
  };

  document.addEventListener("keydown", handleEsc);

  return () => {
    document.body.style.overflow = "auto";
    document.removeEventListener("keydown", handleEsc);
  };
}, [navigate]);

  return (
    <div className="auth-overlay" onClick={() => navigate(-1)}>
      <div
        className="auth-box"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Register</h2>

        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />

        <button>Register</button>

        <p>
          Already have an account?{" "}
          <span
            onClick={() =>
              navigate("/login", {
                state: location.state,
              })
            }
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;