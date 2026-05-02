import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user, isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(true);

  // 🔥 NEW: prevent spam clicks
  const [updating, setUpdating] = useState(false);

  // 🔥 FETCH FROM BACKEND
  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();

      const data = await res.json();

      const normalized = data.map((item) => ({
        ...item,
        _id: item._id?.toString(),
      }));

      setWishlist(normalized);
    } catch {
      setWishlist([]);
    } finally {
      setWishlistLoading(false);
    }
  };

  // 🔥 LOAD WHEN USER CHANGES
  useEffect(() => {
    if (!loading && isLoggedIn) {
      fetchWishlist();
    } else if (!isLoggedIn) {
      setWishlist([]);
      setWishlistLoading(false);
    }
  }, [user, isLoggedIn, loading]);

  // 🔥 TOGGLE (OPTIMISTIC + SAFE)
  const toggleWishlist = async (product) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (updating) return; // 🔥 prevent double clicks

    const productId = product._id?.toString();

    try {
      setUpdating(true);

      // 🔥 OPTIMISTIC UI (instant response)
      setWishlist((prev) => {
        const exists = prev.some(
          (item) => item._id === productId
        );

        if (exists) {
          return prev.filter(
            (item) => item._id !== productId
          );
        } else {
          return [...prev, product];
        }
      });

      const token = localStorage.getItem("token");

      await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
        }),
      });

      // 🔥 FINAL SYNC (real data)
      await fetchWishlist();

    } catch {
      console.log("Wishlist update failed");

      // 🔥 rollback if failed
      await fetchWishlist();
    } finally {
      setUpdating(false);
    }
  };

  // 🔥 CHECK ITEM
  const isWishlisted = (product) => {
    const productId = product._id?.toString();

    return wishlist.some(
      (item) => item._id === productId
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistLoading,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used within WishlistProvider"
    );
  }

  return context;
}