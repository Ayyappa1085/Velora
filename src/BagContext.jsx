import {
  createContext,
  useContext,
  useState,
  useRef,
} from "react";

const BagContext = createContext();

export function BagProvider({ children }) {
  const [bag, setBag] = useState([]);
  const [saved, setSaved] = useState([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [toast, setToast] = useState("");

  const toastTimer = useRef(null);

  const openBag = () => setIsBagOpen(true);
  const closeBag = () => setIsBagOpen(false);

  const showToast = (msg) => {
    setToast("");
    clearTimeout(toastTimer.current);

    setTimeout(() => {
      setToast(msg);

      toastTimer.current = setTimeout(() => {
        setToast("");
      }, 1800);
    }, 50);
  };

  const addToBag = (product, size = "M") => {
  setBag((prev) => {
    const isFirstItem = prev.length === 0;

    const exists = prev.find(
      (item) =>
        item.id === product.id &&
        item.size === size
    );

    let updated;

    if (exists) {
      updated = prev.map((item) =>
        item.id === product.id &&
        item.size === size
          ? {
              ...item,
              qty: item.qty + 1,
            }
          : item
      );
    } else {
      updated = [
        ...prev,
        {
          ...product,
          size,
          qty: 1,
        },
      ];
    }

    if (isFirstItem) openBag();
    else showToast(`Added Size ${size}`);

    return updated;
  });
};

  const increaseQty = (id) => {
    setBag((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: item.qty + 1,
            }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setBag((prev) =>
      prev.flatMap((item) => {
        if (item.id !== id) return item;

        if (item.qty === 1) return [];

        return {
          ...item,
          qty: item.qty - 1,
        };
      })
    );
  };

  const removeFromBag = (id) => {
    setBag((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const saveForLater = (id) => {
    setBag((prev) => {
      const item = prev.find(
        (x) => x.id === id
      );

      if (!item) return prev;

      setSaved((old) => {
        const exists = old.find(
          (s) => s.id === item.id
        );

        if (exists) return old;

        return [...old, item];
      });

      return prev.filter(
        (x) => x.id !== id
      );
    });

    showToast("Saved for Later");
  };

  /* TRUE TRANSFER: saved -> bag */
  const moveToBag = (id) => {
    setSaved((prevSaved) => {
      const item = prevSaved.find(
        (x) => x.id === id
      );

      if (!item) return prevSaved;

      setBag((prevBag) => {
        const exists = prevBag.find(
          (b) => b.id === item.id
        );

        if (exists) {
          return prevBag.map((b) =>
            b.id === item.id
              ? {
                  ...b,
                  qty: b.qty + item.qty,
                }
              : b
          );
        }

        return [...prevBag, item];
      });

      showToast("Moved to Bag");

      return prevSaved.filter(
        (x) => x.id !== id
      );
    });
  };

  const removeSaved = (id) => {
    setSaved((prev) =>
      prev.filter((x) => x.id !== id)
    );
  };

  const totalItems = bag.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const totalPrice = bag.reduce(
    (sum, item) =>
      sum + item.price * item.qty,
    0
  );

  return (
    <BagContext.Provider
      value={{
        bag,
        saved,
        isBagOpen,
        toast,
        openBag,
        closeBag,
        addToBag,
        increaseQty,
        decreaseQty,
        removeFromBag,
        saveForLater,
        moveToBag,
        removeSaved,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </BagContext.Provider>
  );
}

export function useBag() {
  return useContext(BagContext);
}