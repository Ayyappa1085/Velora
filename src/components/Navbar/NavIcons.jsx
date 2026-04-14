import { FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
import DesktopSearch from "../DesktopSearch";
import { useWishlist } from "../WishlistContext";
import { useBag } from "../../BagContext";
import { useAuth } from "../AuthContext";

function NavIcons({ navigate, location }) {
  const { wishlist } = useWishlist();
  const { totalItems, openBag } = useBag();
  const { isLoggedIn } = useAuth();

  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate("/account/profile");
    } else {
      navigate("/login", {
        state: { backgroundLocation: location },
      });
    }
  };

  return (
    <div className="nav-right">
      <DesktopSearch />

      <FaUser onClick={handleUserClick} />

      <div
        style={{ position: "relative", cursor: "pointer" }}
        onClick={() => navigate("/wishlist")}
      >
        <FaHeart />

        {wishlist.length > 0 && (
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

      <div
        style={{ position: "relative", cursor: "pointer" }}
        onClick={openBag}
      >
        <FaShoppingCart />

        {totalItems > 0 && (
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