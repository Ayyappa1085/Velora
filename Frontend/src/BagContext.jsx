import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./components/AuthContext";
import { useNavigate } from "react-router-dom";

// ✅ NEW (API CENTRALIZED)
import api from "./utils/api";

const BagContext = createContext();

export function BagProvider({ children }) {
  const { isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();

  const [bag, setBag] = useState([]);
  const [isBagOpen, setIsBagOpen] = useState(false);

  const [coupon, setCoupon] = useState(null);
  const [saved, setSaved] = useState([]);
  const [prevCount, setPrevCount] = useState(0);

  const fetchCart = async () => {
    try {
      const res = await api.get("/api/cart");
      const data = res.data;
      setBag(Array.isArray(data) ? data : []);
    } catch {
      setBag([]);
    }
  };

  const fetchSaved = async () => {
    try {
      const res = await api.get("/api/saved");
      const data = res.data;
      setSaved(Array.isArray(data) ? data : []);
    } catch {
      setSaved([]);
    }
  };

  useEffect(() => {
    if (!loading && isLoggedIn) {
      fetchCart();
      fetchSaved();
    } else {
      setBag([]);
      setSaved([]);
    }
  }, [isLoggedIn, loading]);

  useEffect(() => {
    if (coupon?.code && bag.length > 0) {
      const coupons = {
        SAVE10: 10,
        SAVE20: 20,
        WELCOME15: 15,
      };

      const percent = coupons[coupon.code];

      if (percent) {
        const discount = Math.round(totalPrice * (percent / 100));

        setCoupon({
          code: coupon.code,
          discount,
        });
      }
    }
  }, [bag]);

  useEffect(() => {
    if (bag.length === 0 && coupon) {
      setCoupon(null);
    }
  }, [bag]);

  useEffect(() => {
    if (prevCount === 0 && bag.length > 0) {
      setCoupon(null);
    }
    setPrevCount(bag.length);
  }, [bag]);

  const addToBag = async (product, size = "M") => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (!product?._id) {
      console.error("Invalid product");
      return;
    }

    try {
      await api.post("/api/cart/add", {
        productId: product._id,
        size,
        quantity: 1,
      });

      await fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ FIXED (NO MORE 404)
  const clearBag = async () => {
    try {
      await api.post("/api/cart/clear");

      setBag([]);
      setCoupon(null);
    } catch (err) {
      console.log("CLEAR BAG ERROR:", err);
      setBag([]);
      setCoupon(null);
    }
  };

  const increaseQty = async (productId, size) => {
    const item = bag.find(
      (i) => i.product._id === productId && i.size === size,
    );

    if (!item) return;

    const stock = item.product.sizeStock?.[size] || item.product.stock || 0;

    if (item.quantity >= stock) {
      return { error: `Only ${stock} available` };
    }

    setBag((prev) =>
      prev.map((i) =>
        i.product._id === productId && i.size === size
          ? { ...i, quantity: i.quantity + 1 }
          : i,
      ),
    );

    try {
      const res = await api.put("/api/cart/update", {
        productId,
        size,
        quantity: item.quantity + 1,
      });

      const data = res.data;
      setBag(Array.isArray(data) ? data : []);
    } catch {
      setBag((prev) =>
        prev.map((i) =>
          i.product._id === productId && i.size === size
            ? { ...i, quantity: i.quantity - 1 }
            : i,
        ),
      );
    }
  };

  const decreaseQty = async (productId, size) => {
    const item = bag.find(
      (i) => i.product._id === productId && i.size === size,
    );

    if (!item) return;

    if (item.quantity === 1) {
      removeFromBag(productId, size);
      return;
    }

    setBag((prev) =>
      prev.map((i) =>
        i.product._id === productId && i.size === size
          ? { ...i, quantity: i.quantity - 1 }
          : i,
      ),
    );

    try {
      const res = await api.put("/api/cart/update", {
        productId,
        size,
        quantity: item.quantity - 1,
      });

      const data = res.data;
      setBag(Array.isArray(data) ? data : []);
    } catch {
      setBag((prev) =>
        prev.map((i) =>
          i.product._id === productId && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        ),
      );
    }
  };

  const removeFromBag = async (productId, size) => {
    try {
      await api.post("/api/cart/remove", {
        productId,
        size,
      });

      await fetchCart();
    } catch {}
  };

  const saveForLater = async (productId, size) => {
    try {
      await api.post("/api/saved/add", {
        productId,
        size,
      });

      await api.post("/api/cart/remove", {
        productId,
        size,
      });

      await fetchCart();
      await fetchSaved();
    } catch {}
  };

  const moveToBagFromSaved = async (productId, size) => {
    try {
      await api.post("/api/cart/add", {
        productId,
        size,
        quantity: 1,
      });

      await api.post("/api/saved/remove", {
        productId,
        size,
      });

      await fetchCart();
      await fetchSaved();
    } catch {}
  };

  const removeFromSaved = async (productId, size) => {
    try {
      await api.post("/api/saved/remove", {
        productId,
        size,
      });

      await fetchSaved();
    } catch {}
  };

  const openBag = () => setIsBagOpen(true);
  const closeBag = () => setIsBagOpen(false);

  const totalItems = bag.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = bag.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0,
  );

  const applyCoupon = (code) => {
    const clean = code?.trim().toUpperCase();

    const coupons = {
      SAVE10: 10,
      SAVE20: 20,
      WELCOME15: 15,
    };

    const percent = coupons[clean];

    if (!percent) {
      return { error: "Invalid coupon" };
    }

    const discount = Math.round(totalPrice * (percent / 100));

    setCoupon({
      code: clean,
      discount,
    });
  };

  const discountAmount = coupon?.discount || 0;

  const finalTotal = Math.max(0, totalPrice - discountAmount);

  return (
    <BagContext.Provider
      value={{
        bag,
        saved,
        isBagOpen,
        openBag,
        closeBag,
        addToBag,
        increaseQty,
        decreaseQty,
        removeFromBag,
        saveForLater,
        moveToBagFromSaved,
        removeFromSaved,
        totalItems,
        totalPrice,
        discountAmount,
        finalTotal,
        applyCoupon,
        clearBag,
      }}
    >
      {children}
    </BagContext.Provider>
  );
}

export function useBag() {
  return useContext(BagContext);
}
