import { FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
import DesktopSearch from "../DesktopSearch";
import { useWishlist } from "../WishlistContext";
import { useBag } from "../../BagContext";
import { useAuth } from "../AuthContext";

function NavIcons({ navigate, location }) {
  const { wishlist } = useWishlist();
  const { totalItems, openBag } = useBag();

  const { isLoggedIn, loading } = useAuth();

  const handleUserClick = () => {
    if (loading) return;

    if (isLoggedIn) {
      navigate("/account/profile");
    } else {
      navigate("/login", {
        state: { backgroundLocation: location },
      });
    }
  };

  // 🔥 FIX: WISHLIST GUARD
  const handleWishlistClick = () => {
    if (loading) return;

    if (!isLoggedIn) {
      navigate("/login", {
        state: { backgroundLocation: location },
      });
      return;
    }

    navigate("/wishlist");
  };

  // 🔥 FIX: BAG GUARD
  const handleBagClick = () => {
    if (loading) return;

    if (!isLoggedIn) {
      navigate("/login", {
        state: { backgroundLocation: location },
      });
      return;
    }

    openBag();
  };

  return (
    <div className="nav-right">
      <DesktopSearch />

      {/* 👤 USER */}
      <FaUser
        onClick={handleUserClick}
        style={{
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.5 : 1,
          transition: "0.2s",
        }}
      />

      {/* ❤️ WISHLIST */}
      <div
        style={{ position: "relative", cursor: "pointer" }}
        onClick={handleWishlistClick}
      >
        <FaHeart />

        {wishlist.length > 0 && isLoggedIn && (
          <span
            style={{
              position: "absolute",
              top: "-6px",
              right: "-8px",
              background: "black",
              color: "white",
              fontSize: "10px",
              padding: "2px 5px",
              borderRadius: "50%",
            }}
          >
            {wishlist.length}
          </span>
        )}
      </div>

      {/* 🛒 BAG */}
      <div
        style={{ position: "relative", cursor: "pointer" }}
        onClick={handleBagClick}
      >
        <FaShoppingCart />

        {totalItems > 0 && isLoggedIn && (
          <span
            style={{
              position: "absolute",
              top: "-6px",
              right: "-8px",
              background: "black",
              color: "white",
              fontSize: "10px",
              padding: "2px 5px",
              borderRadius: "50%",
            }}
          >
            {totalItems}
          </span>
        )}
      </div>
    </div>
  );
}

export default NavIcons;
