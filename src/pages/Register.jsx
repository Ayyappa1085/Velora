import "../styles/Auth.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();

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
  return (
    <div
      className="auth-overlay"
      onClick={() => navigate(closeTo, { replace: true })}
    >
      <div
        className="auth-box register-box"
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
                replace: true,
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