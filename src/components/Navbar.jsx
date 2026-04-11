import "./Navbar.css";
import { FaSearch, FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Searchbar from "./Searchbar";

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const currentCategory = location.pathname.split("/")[1];

  // ✅ FIXED SCROLL (guaranteed working)
  useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY;

    const newState = scrollTop > 20;

    setScrolled(prev => {
      if (prev !== newState) {
        console.log("STATE CHANGED:", newState); // debug
        return newState;
      }
      return prev;
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  return (
    <>
      <div className="top-bar">
        <div className="scroll-text">
          <p>Hi Mawa ❤️ Welcome To Our Website ❤️</p>
        </div>
      </div>

      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-left">
          {!showSearch ? (
            <>
              <a
                className={currentCategory === "men" ? "active" : ""}
                onClick={() => navigate("/men")}
              >
                MEN
              </a>
              <a
                className={currentCategory === "women" ? "active" : ""}
                onClick={() => navigate("/women")}
              >
                WOMEN
              </a>
              <a
                className={currentCategory === "kids" ? "active" : ""}
                onClick={() => navigate("/kids")}
              >
                KIDS
              </a>
              <a
                className={currentCategory === "footwear" ? "active" : ""}
                onClick={() => navigate("/footwear")}
              >
                FOOTWEAR
              </a>
            </>
          ) : (
            <Searchbar
              showSearch={showSearch}
              setShowSearch={setShowSearch}
              query={query}
              setQuery={setQuery}
            />
          )}
        </div>

        <div className="nav-logo">
          <h2 onClick={() => navigate("/")}>Velora</h2>
        </div>

        <div className="nav-right">
          <Searchbar />
          <FaUser
            onClick={() =>
              navigate("/login", {
                state: { backgroundLocation: location },
              })
            }
          />
          <FaHeart />
          <FaShoppingCart />
        </div>
      </nav>

      <div className="mobile-nav">
        <FaSearch onClick={() => setShowSearch(!showSearch)} />
        <FaUser
          onClick={() =>
            navigate("/login", {
              state: { backgroundLocation: location },
            })
          }
        />
        <FaHeart />
        <FaShoppingCart />
      </div>
    </>
  );
}

export default Navbar;